import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

const partners = [
  'Kinfolk',
  'Aperture',
  'Monocle',
  'The Alpine Review',
  'Cereal',
  'Nowness',
];

/**
 * One copy is the label set plus its 64px seam padding, so consecutive copies
 * tile edge to edge and a shift of exactly one copy width is seamless.
 */
const COPY_CLASS = 'flex shrink-0 items-center gap-16 px-8';

/**
 * Quiet credibility strip.
 *
 * The track holds enough copies to span the viewport plus one whole copy, and
 * each cycle slides by exactly one copy width. Both edges and the loop seam
 * therefore stay covered at any viewport width, so the labels never break apart.
 * Extra copies are hidden from assistive tech.
 */
export function Marquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const copy = copyRef.current;
    if (!viewport || !copy) return;

    const fit = () => {
      const copyWidth = copy.getBoundingClientRect().width;
      if (!copyWidth) return;
      // (copies - 1) copies must still cover the viewport at the end of a cycle.
      setCopies(Math.max(2, Math.ceil(viewport.clientWidth / copyWidth) + 1));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative z-10 w-full overflow-hidden border-y border-black/[0.07] bg-white/60 py-5 backdrop-blur-[2px]"
    >
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-shift': `${-100 / copies}%` } as CSSProperties}
      >
        {Array.from({ length: copies }, (_, index) => (
          <div
            key={index}
            ref={index === 0 ? copyRef : undefined}
            className={COPY_CLASS}
            aria-hidden={index > 0 || undefined}
          >
            {partners.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap font-display text-lg tracking-tight text-[#6F6F6F]"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
