import { useState, useRef, useCallback } from 'react';

export interface VoiceRecordingResult {
  base64: string;
  format: string;
}

export interface UseVoiceRecorderOptions {
  onAutoStop?: (result: VoiceRecordingResult) => void;
  silenceTimeoutMs?: number;
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk (PCM 16-bit mono)
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Write PCM samples (convert float -1.0..1.0 to 16-bit signed integer)
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

export function useVoiceRecorder(options: UseVoiceRecorderOptions = {}) {
  const { onAutoStop, silenceTimeoutMs = 1300 } = options;
  const onAutoStopRef = useRef(onAutoStop);
  onAutoStopRef.current = onAutoStop;

  const silenceTimeoutRef = useRef(silenceTimeoutMs);
  silenceTimeoutRef.current = silenceTimeoutMs;

  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  const isRecordingRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioBuffersRef = useRef<Float32Array[]>([]);

  // Voice Activity & Silence Detection refs
  const hasSpokenRef = useRef(false);
  const speechStartTimeRef = useRef(0);
  const silenceTimerRef = useRef<number | null>(null);

  const stopRecording = useCallback((): Promise<VoiceRecordingResult | null> => {
    return new Promise((resolve) => {
      // Clear any pending silence timer
      if (silenceTimerRef.current) {
        window.clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      isRecordingRef.current = false;
      hasSpokenRef.current = false;

      if (!audioContextRef.current || audioBuffersRef.current.length === 0) {
        setIsRecording(false);
        setVolume(0);
        resolve(null);
        return;
      }

      // Disconnect audio nodes
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current.onaudioprocess = null;
        processorRef.current = null;
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const sampleRate = audioContextRef.current.sampleRate || 16000;
      audioContextRef.current.close().catch(() => { });
      audioContextRef.current = null;

      // Flatten PCM buffers
      const chunks = audioBuffersRef.current;
      audioBuffersRef.current = [];
      let totalLength = 0;
      for (let i = 0; i < chunks.length; i++) {
        totalLength += chunks[i].length;
      }

      const mergedSamples = new Float32Array(totalLength);
      let offset = 0;
      for (let i = 0; i < chunks.length; i++) {
        mergedSamples.set(chunks[i], offset);
        offset += chunks[i].length;
      }

      setIsRecording(false);
      setVolume(0);

      if (totalLength === 0) {
        resolve(null);
        return;
      }

      // Encode into standard 16kHz mono WAV
      const wavBlob = encodeWav(mergedSamples, sampleRate);

      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        resolve({
          base64: res,
          format: 'wav',
        });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(wavBlob);
    });
  }, []);

  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      audioBuffersRef.current = [];
      hasSpokenRef.current = false;
      speechStartTimeRef.current = 0;
      if (silenceTimerRef.current) {
        window.clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      const audioCtx = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!isRecordingRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        audioBuffersRef.current.push(new Float32Array(inputData));

        // Volume calculation
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);
        setVolume(Math.min(100, Math.round(rms * 400)));

        // Voice Activity Detection & Silence Auto-Stop
        const now = Date.now();
        const SPEECH_RMS = 0.015;

        if (rms >= SPEECH_RMS) {
          if (!hasSpokenRef.current) {
            hasSpokenRef.current = true;
            speechStartTimeRef.current = now;
          }
          // Reset silence timer while speech is active
          if (silenceTimerRef.current) {
            window.clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        } else if (hasSpokenRef.current && (now - speechStartTimeRef.current >= 600)) {
          // User spoke for at least 600ms and is now quiet
          if (!silenceTimerRef.current && isRecordingRef.current) {
            silenceTimerRef.current = window.setTimeout(async () => {
              if (isRecordingRef.current) {
                const res = await stopRecording();
                if (res && onAutoStopRef.current) {
                  onAutoStopRef.current(res);
                }
              }
            }, silenceTimeoutRef.current);
          }
        }
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);

      isRecordingRef.current = true;
      setIsRecording(true);
      return true;
    } catch (err) {
      console.error('Microphone access failed:', err);
      return false;
    }
  }, [stopRecording]);

  const cancelRecording = useCallback(() => {
    if (silenceTimerRef.current) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    isRecordingRef.current = false;
    hasSpokenRef.current = false;

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => { });
      audioContextRef.current = null;
    }
    audioBuffersRef.current = [];
    setIsRecording(false);
    setVolume(0);
  }, []);

  return {
    isRecording,
    volume,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
