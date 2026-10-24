import { useState, type FormEvent } from 'react';
import { Section, Eyebrow, DisplayHeading } from './Section';
import { Reveal } from './Reveal';

type Status = 'idle' | 'sending' | 'sent';

const budgets = ['Under 25k', '25k – 60k', '60k – 120k', 'Let’s talk'];

export function ReachUs() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState(budgets[1]);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) return setError('Tell us your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('That email looks incomplete.');

    setError(null);
    setStatus('sending');

    // No backend in this build: the enquiry is acknowledged locally.
    window.setTimeout(() => {
      setStatus('sent');
      setName('');
      setEmail('');
      setNote('');
    }, 700);
  };

  return (
    <Section id="reach-us" divider className="py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>Reach us</Eyebrow>
          <DisplayHeading className="mt-6 text-4xl sm:text-5xl md:text-6xl">
            Tell us what you&rsquo;re <em className="italic text-[#6F6F6F]">building</em>.
          </DisplayHeading>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#6F6F6F]">
            Eight engagements a year, chosen slowly. Write a few lines about the work and we
            &rsquo;ll reply within two working days — always by a person, never a sequence.
          </p>

          <dl className="mt-12 space-y-6 border-t border-black/[0.07] pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">Email</dt>
              <dd>
                <a
                  href="mailto:studio@aethera.co"
                  className="font-display text-lg tracking-tight text-[#000000] underline-offset-4 hover:underline"
                >
                  studio@aethera.co
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">Studio</dt>
              <dd className="text-sm text-[#000000]">Rua da Boavista 42, Lisbon</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">Hours</dt>
              <dd className="text-sm text-[#000000]">Mon &ndash; Thu, 09:00 &ndash; 17:00 WET</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className="space-y-8">
              <Field
                id="name"
                label="Your name"
                value={name}
                onChange={setName}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="ada@studio.com"
                autoComplete="email"
              />

              <fieldset>
                <legend className="text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]">
                  Budget
                </legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {budgets.map((option) => {
                    const selected = budget === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBudget(option)}
                        aria-pressed={selected}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                          selected
                            ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                            : 'border-black/15 text-[#6F6F6F] hover:border-black/40 hover:text-[#000000]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <Field
                id="note"
                label="A few lines"
                value={note}
                onChange={setNote}
                placeholder="What are you making, and who is it for?"
                multiline
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-[#000000] px-10 py-4 text-base text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>

              <p aria-live="polite" className="text-sm text-[#6F6F6F]">
                {error
                  ? error
                  : status === 'sent'
                    ? 'Received — we’ll be in touch within two days.'
                    : 'No newsletters. No sequences.'}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email';
  autoComplete?: string;
  multiline?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  multiline = false,
}: FieldProps) {
  const shared =
    'w-full border-0 border-b border-black/15 bg-transparent pb-3 text-base text-[#000000] placeholder:text-[#6F6F6F]/60 focus:border-[#000000] focus:outline-none transition-colors duration-200';

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.22em] text-[#6F6F6F]"
      >
        {label}
      </label>
      <div className="mt-3">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`${shared} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={shared}
          />
        )}
      </div>
    </div>
  );
}
