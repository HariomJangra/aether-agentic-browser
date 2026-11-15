import { useState, useCallback } from 'react';
import { useVoiceRecorder } from './useVoiceRecorder';
import type { VoiceRecordingResult } from './useVoiceRecorder';

interface SpeakButtonProps {
  onVoiceReady: (result: VoiceRecordingResult) => void;
  disabled?: boolean;
}

export default function SpeakButton({ onVoiceReady, disabled = false }: SpeakButtonProps) {
  const [processing, setProcessing] = useState(false);

  const handleAutoStop = useCallback((result: VoiceRecordingResult) => {
    setProcessing(true);
    onVoiceReady(result);
    setProcessing(false);
  }, [onVoiceReady]);

  const { isRecording, startRecording, stopRecording } = useVoiceRecorder({
    onAutoStop: handleAutoStop,
    silenceTimeoutMs: 1300, // 1.3 seconds of silence after speaking triggers auto-submit
  });

  const handleClick = async () => {
    if (disabled || processing) return;

    if (isRecording) {
      setProcessing(true);
      const res = await stopRecording();
      setProcessing(false);
      if (res) {
        onVoiceReady(res);
      }
    } else {
      const ok = await startRecording();
      if (!ok) {
        alert('Could not access microphone. Please ensure microphone permissions are granted.');
      }
    }
  };

  return (
    <button
      type="button"
      className={`quick-action-btn gnani-voice-pill ${isRecording ? 'gnani-voice-pill--recording' : ''} ${processing ? 'gnani-voice-pill--processing' : ''}`}
      onClick={handleClick}
      disabled={disabled || processing}
      title={
        isRecording
          ? 'Listening... Speaks will auto-stop when you pause (or click to stop now)'
          : processing
          ? 'Recognizing speech with Gnani Prisma...'
          : 'Speak in any language (Gnani Prisma & Evon 3.3)'
      }
    >
      {processing ? (
        <>
          <span className="gnani-spinner" />
          <span>Processing...</span>
        </>
      ) : isRecording ? (
        <>
          <span className="gnani-pulse-dot" />
          <span>Listening...</span>
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gnani-voice-pill-mic"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
          <span>Speak</span>
        </>
      )}
    </button>
  );
}
