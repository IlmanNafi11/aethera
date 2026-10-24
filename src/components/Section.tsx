import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Hairline rule above the section, matching the page's quiet dividers. */
  divider?: boolean;
};

export function Section({ id, children, className = '', divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 w-full ${divider ? 'border-t border-black/[0.07]' : ''} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.22em] text-[#6F6F6F] ${className}`}
    >
      {children}
    </p>
  );
}

export function DisplayHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-display font-normal text-[#000000] ${className}`}
      style={{ lineHeight: 0.98, letterSpacing: '-1.6px' }}
    >
      {children}
    </Tag>
  );
}
