import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { label: 'Home', href: '#top', section: 'top' },
  { label: 'Studio', href: '#studio', section: 'studio' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Journal', href: '#journal', section: 'journal' },
  { label: 'Reach Us', href: '#reach-us', section: 'reach-us' },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The hero sits beneath this overlay nav, so it needs the nav's height to
  // reclaim its own top padding. Publishing it as a CSS var keeps the two in
  // sync at every breakpoint without hardcoding a pixel value.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const publish = () => {
      document.documentElement.style.setProperty(
        '--nav-h',
        `${header.getBoundingClientRect().height}px`,
      );
    };

    publish();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(publish);
    observer.observe(header);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--nav-h');
    };
  }, []);

  useEffect(() => {
    const sections = menuItems
      .map((item) => document.getElementById(item.section))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => setScrolled(window.scrollY > 24);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${scrolled ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-30 w-full transition-colors duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <a
          href="#top"
          className="font-display text-3xl tracking-tight text-[#000000]"
          aria-label="Aethera home"
        >
          Aethera<sup className="text-[0.55em] align-super">&reg;</sup>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => {
            const active = activeSection === item.section;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative text-sm transition-colors duration-200 hover:text-[#000000] ${
                  active ? 'text-[#000000]' : 'text-[#6F6F6F]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-[#000000] transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}

          <a
            href="#reach-us"
            className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-[#FFFFFF] transition-transform duration-200 hover:scale-[1.03]"
          >
            Begin Journey
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-[#000000] transition-transform duration-300 ${
                menuOpen ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-[#000000] transition-transform duration-300 ${
                menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-black/[0.07] bg-white/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-8 py-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm transition-colors duration-200 ${
                  activeSection === item.section ? 'text-[#000000]' : 'text-[#6F6F6F]'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-3">
            <a
              href="#reach-us"
              onClick={() => setMenuOpen(false)}
              className="inline-block rounded-full bg-[#000000] px-6 py-2.5 text-sm text-[#FFFFFF]"
            >
              Begin Journey
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
