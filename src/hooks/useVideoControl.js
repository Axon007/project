import { useRef, useEffect } from 'react';
import { VIDEO_EDITING_CONFIG } from '../config/constants';

export const useVideoControl = (activeStep) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    video.play();
    
    const duration = video.duration || VIDEO_EDITING_CONFIG.timePerStep * VIDEO_EDITING_CONFIG.stepsCount;
    video.currentTime = activeStep * VIDEO_EDITING_CONFIG.timePerStep;

    return () => {
      video.pause();
    };
  }, [activeStep]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  return { videoRef, togglePlay };
};