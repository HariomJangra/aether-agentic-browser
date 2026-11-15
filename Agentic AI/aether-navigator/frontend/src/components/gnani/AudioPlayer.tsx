import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
  language?: string;
}

export default function AudioPlayer({ audioUrl, autoPlay = true, language }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    if (autoPlay) {
      audio.play().catch((err) => {
        console.warn('Audio auto-play prevented or failed:', err);
      });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error(e));
    }
  };

  return (
    <div className="gnani-audio-player">
      <button
        type="button"
        className={`gnani-audio-btn ${isPlaying ? 'gnani-audio-btn--playing' : ''}`}
        onClick={togglePlay}
        title={isPlaying ? 'Pause audio' : 'Listen with Gnani Timber 2.5'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="gnani-audio-icon">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gnani-audio-icon">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span className="gnani-audio-label">
          {isPlaying ? 'Playing Timber 2.5...' : `Hear voice ${language ? `(${language})` : ''}`}
        </span>
      </button>
    </div>
  );
}
