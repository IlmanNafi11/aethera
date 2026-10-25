import { Section, Eyebrow, DisplayHeading } from './Section';
import { Reveal } from './Reveal';

export function About() {
  return (
    <Section id="about" divider className="py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <figure className="relative overflow-hidden rounded-sm">
            <img
              src="/media/about.jpg"
              alt="A quiet, sunlit frame from the Aethera reel"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-5 font-display text-sm tracking-tight text-[#000000]">
              Reel still &mdash; winter light
            </figcaption>
          </figure>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-black/[0.07] pt-8">
            {[
              ['9', 'years practicing'],
              ['62', 'works shipped'],
              ['4', 'time zones, one room'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-4xl tracking-tight text-[#000000]">{value}</p>
                <p className="mt-2 text-[13px] leading-snug text-[#6F6F6F]">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:pt-16">
          <Eyebrow>About</Eyebrow>
          <DisplayHeading className="mt-6 text-4xl sm:text-5xl md:text-6xl">
            A small house for{' '}
            <em className="italic text-[#6F6F6F]">deep work</em>.
          </DisplayHeading>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[#6F6F6F]">
            <p>
              Aethera was founded on a simple observation: the loudest tools rarely leave room for
              the quietest thinking. We build platforms, identities, and editorial worlds for
              people who make things carefully — researchers, makers, founders who would rather go
              deep than fast.
            </p>
            <p>
              Our name pairs <span className="font-display text-[#000000]">aer</span> — air, the
              medium every voice travels through — with{' '}
              <span className="font-display text-[#000000]">aether</span>, the older word for the
              clear upper sky. Between noise and silence, there is a register where good work
              becomes audible. That is where we try to live.
            </p>
          </div>

          <blockquote className="mt-10 border-l border-black/20 pl-6">
            <p
              className="font-display text-2xl tracking-tight text-[#000000] sm:text-[1.7rem]"
              style={{ lineHeight: 1.15 }}
            >
              &ldquo;Through the noise, <em className="italic text-[#6F6F6F]">a clear
              frequency</em>.&rdquo;
            </p>
            <cite className="mt-4 block text-[11px] uppercase not-italic tracking-[0.22em] text-[#6F6F6F]">
              Mara Ellison &mdash; Founder, Creative Director
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
