import type { CSSProperties } from 'react';
import { Section, DisplayHeading } from './Section';
import { Reveal } from './Reveal';

const columns = [
  {
    title: 'Studio',
    links: [
      { label: 'Practice', href: '#studio' },
      { label: 'About', href: '#about' },
      { label: 'Journal', href: '#journal' },
      { label: 'Reach us', href: '#reach-us' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'Instagram', href: '#footer' },
      { label: 'Are.na', href: '#footer' },
      { label: 'LinkedIn', href: '#footer' },
      { label: 'Letterboxd', href: '#footer' },
    ],
  },
];

/**
 * The valley. Painted twice inside the scene's own box with identical framing,
 * so both passes agree pixel for pixel and the second one — the one the veil
 * opens over the wordmark — can only hide what lies behind it. That is what
 * buries the letters in the hillside instead of pasting them on top.
 */
function Landscape() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <img
        src="/media/footer.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <div className="footer-shade absolute inset-0" />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative isolate flex w-full flex-col overflow-hidden bg-white"
      style={{ '--wordmark': 'clamp(5rem, 32vw, 40rem)' } as CSSProperties}
    >
      <Section className="pt-20 sm:pt-24">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display text-3xl tracking-tight text-[#000000]">
                Aethera<sup className="align-super text-[0.55em]">&reg;</sup>
              </p>
              <DisplayHeading className="mt-8 max-w-xl text-3xl sm:text-4xl md:text-5xl">
                Beyond silence, we build the{' '}
                <em className="italic text-[#6F6F6F]">eternal</em>.
              </DisplayHeading>

              <a
                href="mailto:studio@aethera.co"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#000000] px-8 py-4 text-base text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03]"
              >
                Begin Journey
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </a>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-10">
              {columns.map((column) => (
                <div key={column.title}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">
                    {column.title}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-[#000000] transition-colors duration-200 hover:text-[#6F6F6F]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </Reveal>
      </Section>

      {/* The legal line is pulled down onto the scene by a margin derived from
          --wordmark, like every other vertical value in the footer. The scene's
          top edge is pure white and the photograph only starts to show from
          roughly 17% of the scene's height down, and that point is a fixed
          share of the scene, so a fixed number of pixels would do nothing at
          one width and bury the band at another. The margin has two parts: the
          band's own padding below its last line (1rem, the same at every
          width because the last row is always the last thing in the band),
          plus a quarter of --wordmark, which drops that last line a fifth of
          the way into the scene — just past the point where the image begins,
          so the band rests on the photograph without climbing into the mist.
          The footer is sized by its content, so shrinking it here carries the
          block above down by the same distance and their gap never changes. */}
      <div
        className="relative z-10 mt-auto"
        style={{ marginBottom: 'calc(-1rem - var(--wordmark) * 0.25)' }}
      >
        <Section className="pb-4">
          <div className="flex flex-col gap-4 border-t border-black/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-[#000000]">
              &copy; {new Date().getFullYear()} Aethera Studio. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#footer"
                className="text-[13px] text-black/60 transition-colors duration-200 hover:text-[#000000]"
              >
                Privacy
              </a>
              <a
                href="#footer"
                className="text-[13px] text-black/60 transition-colors duration-200 hover:text-[#000000]"
              >
                Terms
              </a>
              <a
                href="#top"
                className="group inline-flex items-center gap-2 text-[13px] text-[#000000]"
              >
                Back to top
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  &uarr;
                </span>
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* The scene, anchored to the footer's floor. Its box holds the distance,
          the wordmark and the near hills that sink into the letters. Every
          vertical value is a multiple of --wordmark, so the mist line, the
          burial depth and the strip of terrain below the type keep the same
          proportions at every viewport width. The scene's top edge is pure
          white — it hands off to the page above with no divider at all. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(var(--wordmark) * 1.18)' }}
      >
        <div aria-hidden="true" className="absolute inset-0">
          <Landscape />
          <div className="footer-mist absolute inset-x-0 top-0 h-[42%]" />
        </div>

        {/* Sits on the floor of the scene, with the descender gap pulled out so
            the baseline meets the bottom edge instead of floating above it. */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 select-none text-center font-display leading-none text-white/90"
          style={{
            bottom: 'calc(var(--wordmark) * -0.155)',
            fontSize: 'var(--wordmark)',
            letterSpacing: '-0.045em',
          }}
        >
          Aethera
        </p>

        <div className="footer-veil pointer-events-none absolute inset-0 z-10">
          <Landscape />
        </div>
      </div>
    </footer>
  );
}
