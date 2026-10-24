import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const FADE_SECONDS = 0.5;
const RESTART_DELAY_MS = 100;

/**
 * Fullscreen looping background video with a manual crossfade loop.
 *
 * `requestAnimationFrame` samples currentTime every frame and maps it to opacity:
 *   0 .. 0.5s             fade in   0 -> 1
 *   duration-0.5s .. end  fade out  1 -> 0
 * On `ended` the video drops to opacity 0, rewinds after a short beat, and plays again.
 */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number | null = null;
    let restartTimer: number | null = null;
    let resumeOnGesture: (() => void) | null = null;

    const setOpacity = (value: number) => {
      const next = String(Math.min(1, Math.max(0, value)));
      if (video.style.opacity !== next) video.style.opacity = next;
    };

    const tick = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        const fade = Math.min(FADE_SECONDS, duration / 2);
        if (currentTime < fade) setOpacity(currentTime / fade);
        else if (currentTime > duration - fade) setOpacity((duration - currentTime) / fade);
        else setOpacity(1);
      }

      frameId = requestAnimationFrame(tick);
    };

    const startPlayback = () => {
      setOpacity(0);
      void video.play().catch(() => {
        // Autoplay blocked: resume on the first user gesture.
        resumeOnGesture = () => {
          void video.play().catch(() => {});
        };
        window.addEventListener('pointerdown', resumeOnGesture, { once: true });
        window.addEventListener('keydown', resumeOnGesture, { once: true });
      });
    };

    const handleEnded = () => {
      setOpacity(0);
      restartTimer = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }, RESTART_DELAY_MS);
    };

    video.addEventListener('loadedmetadata', startPlayback);
    video.addEventListener('ended', handleEnded);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) startPlayback();

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      if (restartTimer !== null) clearTimeout(restartTimer);
      if (resumeOnGesture) {
        window.removeEventListener('pointerdown', resumeOnGesture);
        window.removeEventListener('keydown', resumeOnGesture);
      }
      video.removeEventListener('loadedmetadata', startPlayback);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute z-0"
      style={{ inset: 'auto 0 0 0', top: '300px' }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="h-full w-full object-cover"
        style={{ opacity: 0 }}
        muted
        playsInline
        autoPlay
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
}
