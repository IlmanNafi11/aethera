# Aethera® — Cinematic Hero

Fullscreen single-page studio website with a manually crossfaded looping video hero and a complete editorial flow through Studio, About, Philosophy, Journal, Reach Us, and Footer.

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
  App.tsx                      hero viewport + section flow
  components/
    VideoBackground.tsx        rAF-driven fade-in / fade-out loop
    Navbar.tsx                 logo, scroll-spy menu, mobile menu
    Hero.tsx                   headline, description, CTA
    Marquee.tsx                partner strip
    Section.tsx                Section / Eyebrow / DisplayHeading primitives
    Reveal.tsx                 IntersectionObserver entrance
    Studio.tsx                 capability list with image swap
    About.tsx                  story, quote, stats
    Philosophy.tsx             four numbered rules
    Journal.tsx                three entries
    ReachUs.tsx                contact form with validation
    Footer.tsx                 contact CTA, sitemap, scenic wordmark
  styles/
    fonts.css                  Instrument Serif + Inter
    theme.css                  Tailwind entry, tokens, keyframes, footer scene
public/media/                  hero poster, sectional stills, footer.webp
```

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#000000` | headings, logo, active nav, buttons |
| Muted | `#6F6F6F` | descriptions, inactive nav, meta, italic emphasis |
| Paper | `#FFFFFF` | page and gradient endpoints |
| Display | Instrument Serif | headings, logo, pull quotes, numerals |
| Body | Inter | nav, paragraphs, labels, forms |

Recurring rules: one black pill CTA per view (`rounded-full`, `hover:scale-[1.03]`), hairline dividers at `border-black/[0.07]`, uppercase `11px` eyebrows at `0.22em` tracking, `max-w-7xl` content with `px-6 sm:px-8`, and `fade-rise` motion (20px lift, 0.8s ease-out) on every entrance.

## Scenic footer

The footer hands the page off to a photograph instead of closing it with a rule. The valley
(`public/media/footer.webp`, 2752×1489) fades up out of pure white at its top edge, so no
divider is needed between the last section and the scene.

The wordmark is *buried*, not overlaid. `Footer.tsx` paints the landscape **twice** inside one
box — a distance pass under the type, a foreground pass above it — both with identical framing
(`object-cover object-bottom`) and the same `footer-shade` wash. The foreground pass is cut open
by `footer-veil`, a mask that stays clear for the scene's first 60%, reaches 30% cover at 72% and
is opaque from 84% down. Because the two passes agree pixel for pixel, the foreground can only
cover what lies behind it: the letters read clearly at the cap line and dissolve into the near
hills lower down, with no seam and no second crop to keep in sync.

Every vertical value is a multiple of `--wordmark` (`clamp(5rem, 32vw, 40rem)`, set on
`<footer>`): the scene height (`1.18 ×`), the wordmark's baseline offset (`-0.155 ×`) and the
mist band (`42%` of the scene). The mist line therefore sits at the same place on the letters at
every width — verified from 390 px to 2560 px. The legal row uses `mt-auto` so the copyright
always lands on the last pale band, just before the terrain darkens.

The wordmark is `aria-hidden`: it repeats the studio name already present in the logo above.

## Interaction

- **Scroll-spy nav** — an `IntersectionObserver` with a `-45%` root margin marks the section occupying the viewport centre; the header switches from overlay to `fixed` frosted glass after 24px.
- **Studio list** — hovering, focusing, or tapping a row crossfades its still into the shared preview frame.
- **Reveal** — sections lift and fade once on first intersection, staggered by 80–160ms.
- **Marquee** — the partner labels repeat in as many copies as the viewport needs (`ResizeObserver`), and each 38s cycle slides by exactly one copy width, so the strip tiles seamlessly and never shows a break at any width.
- **Form** — validates name and email inline, shows a `Sending…` state, then a receipt message; `aria-live="polite"` announces every change.
- **Reduced motion** — marquee stops, entrances resolve instantly, reveals are forced visible.

## Video loop

`requestAnimationFrame` reads `currentTime` / `duration` each frame and maps it to opacity:
fade in over the first 0.5s, fade out over the last 0.5s, fully opaque in between. On `ended`
the video goes transparent, waits 100ms, rewinds to 0, and plays again — so the loop point is
invisible instead of a hard jump cut.
