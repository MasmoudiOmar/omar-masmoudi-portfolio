import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Media } from '../types';

/**
 * The sneak peek on a project card.
 *
 * Shows the poster still until the card is hovered or focused, then plays the
 * clip. Holding off on playback keeps several cards from decoding video at once
 * on load, and `preload="none"` means the bytes aren't fetched until wanted.
 */
const ProjectPreview: React.FC<{ media: Media; label: string; active: boolean }> = ({
  media,
  label,
  active,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // play() rejects if interrupted (e.g. pointer leaves immediately); ignore.
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active && !reduceMotion) {
      play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active, reduceMotion, play]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover object-top"
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      tabIndex={-1}
    >
      <source src={media.webm} type="video/webm" />
      <source src={media.mp4} type="video/mp4" />
    </video>
  );
};

export default ProjectPreview;
