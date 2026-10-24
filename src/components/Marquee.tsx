const partners = [
  'Kinfolk',
  'Aperture',
  'Monocle',
  'The Alpine Review',
  'Cereal',
  'Nowness',
];

/**
 * Quiet credibility strip. The track is duplicated once so the CSS marquee
 * can loop seamlessly; the copy is hidden from assistive tech.
 */
export function Marquee() {
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-black/[0.07] bg-white/60 py-5 backdrop-blur-[2px]">
      <div className="marquee-track flex w-max items-center gap-16 px-8">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-16"
            aria-hidden={copy === 1}
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
