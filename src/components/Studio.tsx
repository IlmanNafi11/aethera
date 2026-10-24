import { useState } from 'react';
import { Section, Eyebrow, DisplayHeading } from './Section';
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

export function Studio() {
  const [active, setActive] = useState(0);

  return (
    <Section id="studio" className="py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Eyebrow>Studio</Eyebrow>
            <DisplayHeading className="mt-6 text-4xl sm:text-5xl md:text-6xl">
              Four disciplines, <em className="italic text-[#6F6F6F]">one</em> restraint.
            </DisplayHeading>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#6F6F6F]">
              We work as a small permanent team, so nothing is handed off and nothing is lost in
              translation. Every engagement starts with silence: reading the room before drawing
              the first line.
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

        <div>
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
                            active === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
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
    </Section>
  );
}
