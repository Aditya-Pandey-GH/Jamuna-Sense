import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for managing audio playback
 * @param {string} audioUrl - URL of the audio file
 * @param {Function} onPlayCallback - Callback when audio starts playing
 * @returns {Object} - Audio player state and controls
 */
export const useAudioPlayer = (audioUrl, onPlayCallback) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    if (audioUrl && !audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      
      // Event listeners
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleError = (e) => {
    setError('Failed to load audio');
    setIsLoading(false);
    setIsPlaying(false);
  };

  const play = () => {
    if (audioRef.current && audioUrl) {
      // Notify parent component (to stop other players)
      if (onPlayCallback) {
        onPlayCallback();
      }

      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(err => {
          setError('Playback failed');
          setIsLoading(false);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    isPlaying,
    isLoading,
    error,
    play,
    pause,
    stop,
    toggle
  };
};