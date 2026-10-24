import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
};

/**
 * Scroll-triggered entrance used by every section below the hero.
 * Mirrors the hero's `fade-rise` language: 20px lift + fade, 0.8s ease-out.
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal transition-[opacity,transform] duration-[800ms] ease-out will-change-transform ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
