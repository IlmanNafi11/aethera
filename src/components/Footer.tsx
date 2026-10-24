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

export function Footer() {
  return (
    <footer id="footer" className="relative z-10 w-full border-t border-black/[0.07] bg-white">
      <Section className="py-20 sm:py-24">
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
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#000000] px-8 py-4 text-base text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03]"
              >
                Begin Journey
                <span aria-hidden="true">&rarr;</span>
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
                          className="text-sm text-[#6F6F6F] transition-colors duration-200 hover:text-[#000000]"
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

        <div className="mt-16 flex flex-col gap-4 border-t border-black/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#6F6F6F]">
            &copy; {new Date().getFullYear()} Aethera Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#footer"
              className="text-[13px] text-[#6F6F6F] transition-colors duration-200 hover:text-[#000000]"
            >
              Privacy
            </a>
            <a
              href="#footer"
              className="text-[13px] text-[#6F6F6F] transition-colors duration-200 hover:text-[#000000]"
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
    </footer>
  );
}
