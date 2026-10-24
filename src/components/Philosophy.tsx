import { Section, Eyebrow } from './Section';
import { Reveal } from './Reveal';

const principles = [
  {
    index: 'I',
    title: 'Silence is a material',
    body: 'Whitespace is not what remains after the work. It is the work: the pause that lets a page be read instead of scanned.',
  },
  {
    index: 'II',
    title: 'One idea per surface',
    body: 'If a screen needs a second headline to explain the first, the first was not finished. We subtract until it is.',
  },
  {
    index: 'III',
    title: 'Motion with intention',
    body: 'Every transition answers a question the reader already had. Nothing moves to prove that it can.',
  },
  {
    index: 'IV',
    title: 'Built to be lived in',
    body: 'A system is only good if it survives the hundredth edit by someone who did not design it.',
  },
];

export function Philosophy() {
  return (
    <Section divider className="py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Philosophy</Eyebrow>
          <p
            className="mt-6 font-display text-4xl tracking-tight text-[#000000] sm:text-5xl"
            style={{ lineHeight: 1, letterSpacing: '-1.6px' }}
          >
            Four rules we <em className="italic text-[#6F6F6F]">return</em> to.
          </p>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[#6F6F6F]">
            Not a manifesto. A checklist we run every project against before it leaves the studio.
          </p>
        </Reveal>

        <ol className="border-t border-black/[0.07]">
          {principles.map((item, i) => (
            <Reveal as="li" key={item.index} delay={i * 90}>
              <div className="grid gap-4 border-b border-black/[0.07] py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
                <span className="font-display text-lg tracking-tight text-[#6F6F6F]">
                  {item.index}
                </span>
                <div>
                  <h3
                    className="font-display text-2xl tracking-tight text-[#000000] sm:text-3xl"
                    style={{ lineHeight: 1.1, letterSpacing: '-0.8px' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6F6F6F]">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
