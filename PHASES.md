# PHASES.md — build runbook

Claude Code: run exactly one phase per session. Never start the next phase
without being asked. At the end of every phase: `npm run build`, then `git commit`, then stop and report what the human should check.

If the human says "run phase N", read that phase below and do only that.

-----

## PHASE 0 — Scaffold

Read CLAUDE.md fully before doing anything.

Scaffold a Next.js 15 project: TypeScript, Tailwind, App Router, src/ dir,
ESLint, no Turbopack flag. Install next-intl, gsap, lenis.

Set up:

- src/app/[locale]/ routing structure
- src/i18n/ with next-intl config, locales ['bg','en','ru','de'], default 'bg'
- middleware.ts for locale detection with cookie persistence (NEXT_LOCALE)
- messages/bg.json, en.json, ru.json, de.json — empty objects for now
- tailwind.config.ts with the exact palette from CLAUDE.md as named tokens
  (ink, black, charcoal, steel, bone, blood, blood-hi) and Sofia Sans /
  Sofia Sans Condensed as font families
- next/font setup for both Sofia Sans cuts, latin + cyrillic subsets

Done when: build passes and /bg /en /ru /de all resolve.
Human checks: nothing visual yet. This is expected.

-----

## PHASE 1 — Design foundation

Use the site-builder agent. Build only design primitives, no page content.

- globals.css: CSS custom properties for the palette, base type scale, grain
  texture utility (SVG noise overlay, opacity ≤ 0.06), duotone image filter
  utility (#0A0A0A → #B10000)
- Type scale: display (clamp 3rem→7rem, Sofia Sans Condensed 800, uppercase,
  tracking -0.02em), h2, h3, body, caption
- Primitives: Section wrapper, Container, Rule (2px #B10000 divider),
  Button (filled blood / outline white), Eyebrow label
- prefers-reduced-motion media query that kills all transitions globally

Build a temporary /styleguide route showing every primitive.
Then run the design-critic agent against it.

Human checks: open /styleguide. Does the red look like blood or like a sale
sticker? Is the condensed display type heavy enough? Fix it now — everything
later sits on top of this.

-----

## PHASE 2 — MVP, Bulgarian only, one page

Use the site-builder agent. Bulgarian only. Ignore the other three locales.
No animation yet. Static, correct, mobile-first, designed from 375px up.

Section order:

1. HERO — full-bleed B&W gym photo, dark scrim. H1 all caps, one word in
   #B10000. Directly beneath: hours, "Център, Слънчев бряг", and two real
   CTAs — tel: link and Google Maps link to the Place ID. Hours + location +
   phone must be visible without scrolling.
1. PROOF BAR — thin black strip: rating as plain text, review count,
   "20 години" badge (leave the year as a token — unverified), dumbbells to
   55 kg, air conditioning.
1. THE GYM — the owner-built-machines story. Two paragraphs maximum.
1. EQUIPMENT — the full list from CLAUDE.md as a dense typographic grid.
   Do not turn it into icon cards. The length of the list is the argument.
1. PASSES — day / week / month, what each is for. No prices. CTA is call or
   walk in, never a fake booking form.
1. REVIEWS — three approved quotes, attributed, source noted.
1. FIND US — map linking to the Place ID pin, address, hours, phone, walking
   time from the beach.
1. FOOTER — NAP block, Facebook link, language switcher placeholder.

Then run design-critic.

Human checks: open it on a phone, not a laptop. Can you get the phone number
in one thumb tap from the top of the page?

-----

## PHASE 3 — Four languages

Use copy-localizer and site-builder.

Extract every string from Phase 2 into messages/bg.json with structured keys.
Produce en.json, ru.json, de.json as adaptations, not literal translations.
German factual and direct. Russian slightly warmer. English simple, idiom-free.

Language switcher: languages in their own script (Български / English /
Русский / Deutsch), persists to NEXT_LOCALE cookie, keeps the user on the
same page.

Verify all four locale files have identical key sets. Report any drift.

Human checks: switch to each language, confirm nothing falls back to English
by accident and no layout breaks on the longer German words.

-----

## PHASE 4 — SEO and structured data

Use the seo-schema agent. Follow its hard prohibitions exactly.

Per-locale title/description targeting real search phrasing:

- bg: фитнес Слънчев бряг
- en: gym Sunny Beach
- ru: тренажерный зал Солнечный берег
- de: Fitnessstudio Sonnenstrand

Add an FAQ section before the footer, question-shaped H3s in each language:
"Is there a gym in Sunny Beach?" / "Do you sell day passes?" / "What are the
opening hours?" / "Where exactly is the gym?" / "Do you have heavy dumbbells?"
/ "Is there air conditioning?" / "When is the gym least busy?" — answer the
last one honestly.

Answer-first: the first sentence of each answer must be a complete,
standalone, extractable statement.

Human checks: nothing visible changes much. That's fine.

-----

## PHASE 5 — Motion and detail

Use the site-builder agent. Re-read the motion rule in CLAUDE.md first.

- Lenis smooth scroll, fully disabled under prefers-reduced-motion
- ONE scroll-triggered fade+rise on section entry, using gsap.to() from a
  visible base state. Content must render fully with JavaScript disabled —
  actually disable JS and verify before claiming it works.
- Hero: subtle scale on the background photo only. No text animation.
- Hover states on CTAs only. Nothing ambient, nothing decorative.

Detail pass: focus rings, tap target sizes, optical alignment of the
condensed display type, grain tuning, favicon, OG image.

Then run design-critic.

Human checks: turn off JavaScript in the browser. If the page goes blank,
it's wrong — this is the bug that keeps recurring.

-----

## PHASE 6 — Verify and deploy

Run the qa-verifier agent. Report the full checklist with evidence. Fix every
failure, re-run until clean.

Then deploy to Vercel, custom domain, verify all four locales live, verify
hreflang resolves on the live URLs, submit the sitemap to Google Search
Console, run the live URL through Google's Rich Results Test.

-----

## PHASE 7 — Stakeholder revision pass (post-launch)

Not part of the original 6-phase sequence — this is real feedback on the
live, deployed site, addressed with the same discipline as every other
phase (build must pass, design-critic audit before commit, no invented
facts).

What changed:

- Display typeface swapped: Sofia Sans Condensed → Oswald (700), because
  the original read as "wrong personality" for an old-school iron gym.
  Cyrillic support verified before shipping (Bulgarian is the default
  locale, Russian is one of the four — non-negotiable).
- Equipment section condensed: still all 16 real items (nothing deleted,
  nothing invented), now shown as pill/tag chips split into a curated
  highlight set plus the rest behind a native `<details>` expand, instead
  of one long bordered list eating half the page.
- FAQ trimmed 7 → 5 (dropped the two most redundant with content already
  shown in ProofBar/Equipment) and converted to a real accordion (one
  `<details>` per question) instead of a static stacked list.
- Language switcher moved off the footer into a persistent top bar so it's
  reachable at any scroll position. Flag icons were requested but not
  implemented — recognisable flags need national colours that don't exist
  in the fixed palette; this needs an explicit stakeholder decision to
  override the palette rule, not a guess.
- ProofBar and Reviews rebuilt for real visual weight (large rating/review
  numerals, a decorative star-rating row) — the old ProofBar was a thin
  caption-sized strip that read as "practically inexistent" against real
  numbers (~4.4★, ~149 reviews, unchanged from what CLAUDE.md documents —
  only the presentation changed, not the facts).

`rounded-full` is now a narrow, explicit exception to the border-radius
ban, scoped to exactly two files (Equipment's chips, the language-switcher
badges) — see CLAUDE.md's Design system section and
`.claude/agents/design-critic.md` for the exact scope.

-----

## PHASE 9 — Second direct revision round (post-launch)

More live feedback on Phase 7/8's output, addressed in the same session:

- Display typeface swapped twice more: Oswald → Russo One → PT Sans Bold.
  Both swaps Cyrillic-verified before shipping (grepped the generated
  `@font-face` `unicode-range` for `U+0400-045F`, same method as every
  prior font swap) — see CLAUDE.md's Typography section for the full
  swap history and why the genre changed (display/poster face → serious
  workhorse grotesque) after two poster-style picks both got rejected.
- Language switcher stripped to flags-only — the own-script text label
  (Български/English/Русский/Deutsch) is still in the DOM as `sr-only`
  so the accessible name survives, it just doesn't render visually
  anymore.
- Fixed a real bug behind a "text overlapping" report: `TheGym`'s heading
  accent ("not bought", etc.) was inline with the plain text before it,
  so the browser was free to break the line *inside* the red chip,
  producing a jagged multi-line red box. Moving the accent onto its own
  line (block-level) fixed it regardless of copy length — shortening the
  copy alone hadn't been enough.
- `TheGym`'s paragraphs tightened further; English's "Call" CTA button
  copy became "Call us".

-----

## PHASE 10 — Third revision round (post-launch)

More live feedback, addressed in the same session:

- Review count corrected: owner verified 177 Google reviews (the
  previously-documented ~149 was stale) — the most of any gym in Sunny
  Beach. Added as a second competitive claim alongside the existing
  23-years/oldest-gym one, in both `ProofBar`'s copy (all four locales)
  and CLAUDE.md's THE BUSINESS/Positioning sections.
- Equipment's default view tightened again: 8 highlight chips → 4 (the
  categories a tourist actually searches for — dumbbells, boxing,
  calisthenics, cables), the other 12 moved behind the existing
  `<details>` expand. Same 16 real items, nothing added or removed. The
  expand toggle itself restyled from an underlined text link to a real
  bordered button, per explicit feedback to "put a button to see more."
- Reviews' quote text shrunk from `text-h3` (clamp 1.5rem→2.25rem) to
  `text-body` (1rem) — it was overpowering the review card at large
  viewport sizes.
- ProofBar's secondary stats (`dumbbells`, `ac`) restyled from plain
  caption-sized text into `rounded-full` oval chips matching Equipment's
  pill treatment, scoped for the black background (steel border/white
  text instead of Equipment's ink-on-bone).

-----

## PHASE 4.5 — Legal pages and security hardening

Not part of the original 6-phase sequence — real compliance/security work,
same discipline as every other phase (build must pass, design-critic audit
before commit, no invented facts).

- `src/config/legal.ts`: single source of truth for the entity's legal
  identity. Fields the owner hasn't supplied are the literal string
  `TODO_OWNER`, never an invented value — currently `legalEntityName`,
  `eik`, `registeredAddress`, `contactEmail`. A dev-only warning
  (`src/components/LegalTodoWarning.tsx`) lists exactly which fields are
  still missing on `/privacy`, so this can't ship half-filled unnoticed —
  verified it fires in `next dev` and is silent in a production build.
- `/[locale]/privacy` (all four locales): GDPR + Bulgarian Personal Data
  Protection Act policy. Bulgarian is authoritative, the other three say
  so explicitly. Covers what's collected (server logs + the `NEXT_LOCALE`
  cookie only — no forms, accounts, or analytics), legal basis per item,
  retention (still `TODO_OWNER`, pending the host's confirmed window),
  who data is shared with (Vercel Inc. as processor), GDPR rights incl.
  the right to complain to the КЗЛД, and a cookie table. No consent
  banner — deliberate, since the only cookie is strictly necessary.
- `/[locale]/terms` (all four locales): informational-only site, no
  bookings/payments, no prices, positively-framed house rules, a
  training-risk disclaimer, Bulgarian law/text governs.
- Both linked from `Footer` in all locales, nothing added to `TopBar`.
- Security headers via `next.config.ts`: HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options: DENY`, a locked-down
  `Permissions-Policy`, `poweredByHeader: false`, no production source
  maps.
- CSP required a nonce-based implementation in `src/middleware.ts` instead
  of a static header in `next.config.ts` — a real headless-Chromium
  console check across all 12 locale/page combinations caught a static
  `script-src 'self'` blocking Next's own RSC-hydration inline scripts on
  every page. Composed with next-intl's own middleware via Next's
  documented request-header-override mechanism; a first attempt that
  overwrote next-intl's own override list instead of merging into it
  silently broke locale-aware `<Link>` prefetching (caught the same way —
  fresh-browser-context checks, not assumption). No `'unsafe-eval'`, no
  wildcard, anywhere in the final CSP.
- `/.well-known/security.txt`: a route handler (not a static file) so
  `Contact`/`Expires` always derive from `legal.ts`.
- Audited: external links already had `rel="noopener noreferrer"`, no
  `<form>` exists anywhere in the codebase, no secrets committed,
  robots.txt's AI-crawler allowances untouched. `npm audit`: 3 high
  findings, all transitively inherited via `next`'s own bundled
  `postcss`/`sharp`, fix requires a breaking major Next.js upgrade — not
  auto-applied, flagged for the owner/maintainer to schedule.

-----

## BLOCKED UNTIL THE OWNER PROVIDES

- ~~Founding year~~ **RESOLVED as of Phase 8** — owner-verified 23 years,
  oldest gym in Sunny Beach. See CLAUDE.md's THE BUSINESS section.
- Photography — in progress, not yet at the 10-shot minimum. See
  CLAUDE.md's Photography section for the current committed/unplaced/
  lost breakdown.
- Decision on whether to mention the former "Fitness Mercury" name
- Decision on Instagram: create the account or omit it entirely

Phase 2 can be built with labelled empty photo slots, but it cannot ship
without real images. No stock, no AI-generated images. Ever.
