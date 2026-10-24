import { Section, Eyebrow, DisplayHeading } from './Section';
import { Reveal } from './Reveal';

const entries = [
  {
    image: '/media/journal-1.jpg',
    date: 'Feb 2026',
    title: 'Notes on quiet interfaces',
    excerpt: 'What a reading room taught us about attention, latency, and care.',
    readTime: '6 min',
  },
  {
    image: '/media/journal-2.jpg',
    date: 'Jan 2026',
    title: 'The studio that slows down',
    excerpt: 'Eight engagements a year is not a constraint. It is the method.',
    readTime: '9 min',
  },
  {
    image: '/media/journal-3.jpg',
    date: 'Dec 2025',
    title: 'Sky registers',
    excerpt: 'A short history of the aether, and why we kept the old word.',
    readTime: '4 min',
  },
];

export function Journal() {
  return (
    <Section id="journal" divider className="py-24 sm:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Journal</Eyebrow>
            <DisplayHeading className="mt-6 text-4xl sm:text-5xl md:text-6xl">
              Slow notes, <em className="italic text-[#6F6F6F]">rarely</em>.
            </DisplayHeading>
          </div>
          <a
            href="#journal"
            className="group inline-flex items-baseline gap-2 text-sm text-[#000000] transition-colors hover:text-[#6F6F6F]"
          >
            All entries
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {entries.map((entry, i) => (
          <Reveal as="article" key={entry.title} delay={i * 100}>
            <a href="#journal" className="group block">
              <div className="overflow-hidden rounded-sm bg-black/[0.03]">
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">
                {entry.date} &middot; {entry.readTime}
              </p>
              <h3
                className="mt-3 font-display text-2xl tracking-tight text-[#000000] transition-colors duration-300 group-hover:text-[#6F6F6F]"
                style={{ lineHeight: 1.1, letterSpacing: '-0.8px' }}
              >
                {entry.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6F6F6F]">{entry.excerpt}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
