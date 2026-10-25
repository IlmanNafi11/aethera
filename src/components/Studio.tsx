import { useLayoutEffect, useRef, useState } from 'react';
import { Eyebrow, DisplayHeading } from './Section';
import { Reveal } from './Reveal';

const capabilities = [
  {
    index: '01',
    title: 'Identity systems',
    body: 'Marks, type, and the rules that keep them honest at every scale.',
    image: '/media/studio.jpg',
  },
  {
    index: '02',
    title: 'Digital products',
    body: 'Interfaces built for long attention spans and slow, deliberate work.',
    image: '/media/about.jpg',
  },
  {
    index: '03',
    title: 'Editorial direction',
    body: 'Narrative structure, art direction, and the cadence of a page.',
    image: '/media/journal-1.jpg',
  },
  {
    index: '04',
    title: 'Motion & sound',
    body: 'Transitions that carry meaning rather than announce themselves.',
    image: '/media/journal-2.jpg',
  },
];

/**
 * The pin only exists once the layout has room for it. Mirrors the `pin:`
 * variant in theme.css, which is the CSS half of the same condition: wide
 * enough for two columns, tall enough to hold the left column plus the
 * panel's padding, and not something motion-sensitive users opted out of.
 */
const PIN_QUERY =
  '(min-width: 64rem) and (min-height: 45rem) and (prefers-reduced-motion: no-preference)';

/** Share of the card window that fades out at its far edge, in percent. */
const EDGE_FADE = 7;

export function Studio() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  /**
   * The section is a scroll track: a viewport-tall panel sticks inside it and
   * the card translates through the window while the track passes under the
   * pin. The track is only as long as the card actually overflows, so the
   * section unlocks the moment the last line of the card is in view.
   */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const win = windowRef.current;
    const card = cardRef.current;
    if (!section || !panel || !win || !card) return;

    const pinQuery = window.matchMedia(PIN_QUERY);
    let frame = 0;

    const paint = () => {
      frame = 0;
      const travel = section.offsetHeight - panel.offsetHeight;

      if (travel <= 0) {
        card.style.transform = '';
        win.style.setProperty('--studio-fade-bottom', '0%');
        return;
      }

      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), travel);
      card.style.transform = `translate3d(0, ${-scrolled}px, 0)`;
      // Only the bottom band tracks the scroll: it hides card still waiting
      // below the fold. The top band is fixed in CSS, so rows dissolve as they
      // cross the line the two columns share instead of being sliced.
      win.style.setProperty('--studio-fade-bottom', `${EDGE_FADE * (1 - scrolled / travel)}%`);
    };

    const measure = () => {
      if (!pinQuery.matches) {
        section.style.height = '';
        paint();
        return;
      }

      // The window has no height of its own beyond the space it is given, so
      // that space comes from the panel's content box. Measuring the window
      // would report "it already fits" forever.
      const style = getComputedStyle(panel);
      const available =
        panel.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      const overflow = Math.max(0, card.offsetHeight - available);

      // No overflow: the section is just the panel, so there is no track to
      // travel and the page scrolls straight through to the next section.
      section.style.height = overflow > 0 ? `${panel.offsetHeight + overflow}px` : '';
      paint();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    pinQuery.addEventListener('change', measure);

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(card);
    observer?.observe(panel);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      pinQuery.removeEventListener('change', measure);
      observer?.disconnect();
      section.style.height = '';
      card.style.transform = '';
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative z-10 w-full pin:h-svh pin:scroll-mt-[-5.5rem]"
    >
      <div
        ref={panelRef}
        className="py-24 sm:py-32 pin:sticky pin:top-0 pin:h-svh pin:pt-[calc(var(--nav-h,0px)+3rem)] pin:pb-16"
      >
        {/* The top padding is the nav plus one fade band, so the band sits in
            the clear strip under the nav instead of hiding behind it. The
            bottom padding is smaller than the unpinned one to pay for it: the
            pinned window is clipped anyway, and the left column has to keep
            fitting inside the panel or it slides under the nav. */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 pin:h-full">
          {/* items-start, not center: the left block and the first capability
              row have to begin on the same line, because that shared line is
              where the card window's top fade ends. */}
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 pin:h-full pin:items-start">
            <div>
              <Reveal>
                <Eyebrow>Studio</Eyebrow>
                <DisplayHeading className="mt-6 text-4xl sm:text-5xl md:text-6xl">
                  Four disciplines, <em className="italic text-[#6F6F6F]">one</em> restraint.
                </DisplayHeading>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#6F6F6F]">
                  We work as a small permanent team, so nothing is handed off and nothing is lost
                  in translation. Every engagement starts with silence: reading the room before
                  drawing the first line.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <dl className="mt-12 grid max-w-md grid-cols-2 gap-y-8 border-t border-black/[0.07] pt-8">
                  {[
                    ['Founded', '2016'],
                    ['Practice', 'Independent'],
                    ['Engagements', '8 per year'],
                    ['Based', 'Lisbon / Kyoto'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">
                        {label}
                      </dt>
                      <dd className="mt-2 font-display text-2xl tracking-tight text-[#000000]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="pin:flex pin:min-h-0 pin:flex-col pin:self-stretch">
              <div
                ref={windowRef}
                className="relative pin:studio-fade pin:min-h-0 pin:flex-1 pin:overflow-hidden"
              >
                <div ref={cardRef} className="pin:will-change-transform">
                  <ul className="border-t border-black/[0.07]">
                    {capabilities.map((item, i) => (
                      <Reveal as="li" key={item.index} delay={i * 80}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          onClick={() => setActive(i)}
                          aria-pressed={active === i}
                          className="group block w-full border-b border-black/[0.07] py-7 text-left"
                        >
                          <div className="flex items-baseline gap-5">
                            <span className="w-8 shrink-0 text-[11px] tabular-nums tracking-[0.18em] text-[#6F6F6F]">
                              {item.index}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-4">
                                <span
                                  className={`font-display text-2xl tracking-tight transition-colors duration-300 sm:text-3xl ${
                                    active === i ? 'text-[#000000]' : 'text-[#6F6F6F]'
                                  }`}
                                  style={{ letterSpacing: '-0.8px' }}
                                >
                                  {item.title}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`ml-auto text-lg text-[#000000] transition-all duration-300 ${
                                    active === i
                                      ? 'translate-x-0 opacity-100'
                                      : '-translate-x-2 opacity-0'
                                  }`}
                                >
                                  &rarr;
                                </span>
                              </div>
                              <p
                                className={`mt-3 text-sm leading-relaxed text-[#6F6F6F] transition-opacity duration-300 ${
                                  active === i ? 'opacity-100' : 'opacity-60'
                                }`}
                              >
                                {item.body}
                              </p>
                            </div>
                          </div>
                        </button>
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal delay={160}>
                    <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-sm bg-black/[0.03]">
                      {capabilities.map((item, i) => (
                        <img
                          key={item.index}
                          src={item.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                            active === i ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                          }`}
                        />
                      ))}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/25" />
                      <p className="pointer-events-none absolute bottom-4 left-5 font-display text-sm tracking-tight text-[#000000]">
                        {capabilities[active].title}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
