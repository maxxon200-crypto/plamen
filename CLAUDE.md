# PROJECT: Fitness Plamen GYM Sunny Beach

## Repository state (read this first)
**Phases 0–6 (scaffold through verification) are done and live in
production** (merged to `main`, deployed to Vercel). **Phase 7 — a
stakeholder revision pass on the live site — is also done**: typography
swap (Sofia Sans Condensed → Oswald for display), Equipment section
redesigned as expandable pill chips, FAQ trimmed 7→5 and converted to a real
accordion, language switcher moved from the footer to a persistent top bar,
and ProofBar/Reviews rebuilt for much more visual prominence. **Phase 8 —
first real content — is also done**: the 23-year founding claim is now
owner-verified and live (leads `ProofBar`), and the first three real assets
(a Hero background photo, an owner portrait, the owner's logo) are
committed and wired in — see **Photography** below for exactly what's in,
what's still missing, and why some chat-shared photos didn't make it.
**Phase 9 — a second, more direct revision round — is also done**: the
display typeface changed twice more in quick succession (Oswald → Russo
One → PT Sans, see Typography below for why), the language switcher is
now flags-only with text kept `sr-only`, `TheGym`'s heading accent moved
to its own line to stop the red chip splitting across a wrapped line
break, `TheGym`'s paragraphs were tightened further, and the English
"Call" CTA became "Call us". **Phase 10 — a third revision round — is
also done**: the review count was corrected to the owner-verified 177
(up from the previously-documented ~149) and the site now also claims
"most reviewed gym in Sunny Beach" alongside the existing "oldest gym"
claim (both `ProofBar`'s copy and CLAUDE.md's Positioning/THE BUSINESS
sections); Equipment's default view tightened from 8 highlight chips to
4 (all 16 real items still present, just 12 behind the expand instead of
8) and its expand toggle restyled from an underlined text link to a real
bordered button; Reviews' quote text shrunk from `text-h3` to `text-body`
(it was overpowering the card at large sizes); and ProofBar's
dumbbells/AC secondary stats moved from plain caption text to the same
`rounded-full` oval-chip treatment Equipment uses, scoped for the black
background. See `PHASES.md` for the full per-phase runbook including all
four post-launch passes.

`SITE_URL` in `src/lib/site.ts` may still be a placeholder domain depending
on whether the real domain has been swapped in yet — check that file before
assuming canonical/OG/sitemap URLs are live-correct.

What exists right now:
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v3 + ESLint, scaffolded
  into `src/`, no Turbopack.
- `src/app/[locale]/layout.tsx` — sets `<html lang>` per locale, wraps
  children in `NextIntlClientProvider`, mounts `TopBar` before `children`,
  loads the Sofia Sans / Oswald font variables, and exports
  `generateMetadata()` (Phase 4 — see below).
- `src/i18n/routing.ts` — next-intl `defineRouting`, locales
  `['bg','en','ru','de']`, default `bg`.
- `src/i18n/request.ts` — next-intl `getRequestConfig`, loads
  `messages/{locale}.json`.
- `src/middleware.ts` — next-intl middleware, locale detection +
  `NEXT_LOCALE` cookie persistence, matcher excludes `api`/`_next`/files.
- `src/lib/fonts.ts` — `next/font/google` for Sofia Sans (400/600, body) and
  PT Sans (700, display — exported as `displayFont`, mapped to the same
  `--font-display` CSS variable and `font-condensed` Tailwind class the
  codebase already uses everywhere, so no component markup had to change
  across any of the display-typeface swaps: Sofia Sans Condensed → Oswald
  → Russo One → PT Sans), latin + cyrillic subsets, self-hosted at build
  time.
- `messages/{bg,en,ru,de}.json` — real, structurally-identical copy under
  nine namespaces (`hero`, `proofBar`, `theGym`, `equipment`, `passes`,
  `reviews`, `findUs`, `footer`, `languages`). `bg.json` is the source of
  truth; `en`/`ru`/`de` are adaptations, not literal translations, in each
  language's real gym vocabulary. `reviews.items[].quote`/`.author` are
  byte-identical English text across all four files by design (real Google
  review quotes are never translated — only `.meta`'s date format adapts).
- `tailwind.config.ts` — palette tokens (`ink`, `black`, `charcoal`, `steel`,
  `bone`, `white`, `blood`, `blood.hi`) and `font-sans`/`font-condensed`
  mapped to the Sofia Sans / PT Sans CSS variables, plus a `fontSize`
  scale (`display`/`h2`/`h3`/`body`/`caption`, weight 700 to match PT
  Sans's loaded Bold weight) for the condensed-caps type system.
  Tailwind v3 (config-file-based), not v4 — chosen so the palette lives in
  one typed `tailwind.config.ts` rather than a CSS `@theme` block.
- `src/app/globals.css` — the same palette tokens mirrored as CSS custom
  properties, a `texture-grain` utility (SVG fractal-noise overlay, opacity
  0.06), a `duotone-blood` utility (ink→blood mix-blend overlay — apply to
  real gym photography only, never stock/AI imagery), and a global
  `prefers-reduced-motion` kill switch for animation/transition durations.
- `src/components/ui/` — `Section`, `Container`, `Rule`, `Button` (renders a
  real `<a>` when given `href`, otherwise a real `<button>` — never a dead
  CTA), `Eyebrow`. All Server Components, no client JS.
- `src/app/[locale]/styleguide/` — temporary locale-aware route rendering
  every palette swatch, type-scale sample, primitive, and texture utility.
  For human/design review only; remove once Phase 2+ pages validate the
  system in real content. Not linked from the public site.
- `public/` is currently empty — the default create-next-app SVG placeholders
  were removed since nothing references them and this project doesn't use
  placeholder imagery (see **Photography** below).
- `src/app/[locale]/page.tsx` — the single-page MVP, built from nine
  section components under `src/app/[locale]/_sections/`, each an `async`
  Server Component pulling its copy via `getTranslations` (next-intl/server):
  `Hero` (real B&W-treated photo background, `public/photos/
  dumbbell-rack.jpg` via `HeroBackground` — small/chat-compressed source,
  swap for full-res when available; hours/location/tel+maps CTAs above the
  fold), `ProofBar` (three large numerals — years/rating/review count, years
  leading — plus a decorative `StarRating`; the "23 години" founding claim
  is real and owner-verified, see **THE BUSINESS**), `TheGym` (owner-portrait
  photo alongside the two-paragraph story), `Equipment` (pill-chip
  highlights + expandable "more", all 16 real items still present, see the
  Equipment section above), `Passes` (day/week/month, no prices), `Reviews`
  (three of the five approved quotes, verbatim/untranslated in every
  locale, each with a `StarRating`), `FindUs`, `FAQ` (5 Q&As, native
  `<details>` accordion per item), `Footer` (NAP block, the owner's logo in
  a white badge card, Facebook link — no longer the language switcher, see
  `TopBar` below). No animation beyond the existing scroll-reveal, no
  `'use client'` in any section — fully static Server Components; only
  `LanguageSwitcher` is a
  client component.
- `src/i18n/navigation.ts` — next-intl `createNavigation(routing)`,
  exporting locale-aware `Link`/`usePathname`/`useRouter`/`getPathname`.
- `src/components/TopBar.tsx` — slim `fixed` bar pinned above `Hero` in the
  locale layout, holding `LanguageSwitcher`. Moved here from the footer
  after live feedback that it needed to be reachable at any scroll position,
  not just once at the bottom.
- `src/components/LanguageSwitcher.tsx` — client component, real working
  links to all four locales, styled as `rounded-full` pill badges (one of
  the two explicit border-radius exceptions), `aria-current` on the active
  locale, persists via the existing middleware's `NEXT_LOCALE` cookie
  handling (no extra client-side cookie code needed). Each badge shows a
  flag icon from `src/components/Flags.tsx` only — stakeholder explicitly
  confirmed wanting flags despite the palette conflict, so national flag
  colours are a narrow, explicit exception scoped to exactly that one file
  (see Palette below), and later asked for flags-only with the own-script
  text label (Български/English/Русский/Deutsch) removed visually — it's
  kept as `sr-only` so the accessible name survives. English is
  represented by the UK flag — a judgement call, nothing in CLAUDE.md
  picked UK vs. US.
- `src/components/StarRating.tsx` — decorative 5-star SVG row (not the
  Unicode ★ glyph, so partial fill works), `aria-hidden` since the adjacent
  numeral/label already carries the accessible rating info. Filled portion
  is a `fill-blood` shape (sanctioned use of red — a fill, not text-on-
  black), empty stars are `stroke-steel`. Uses React's `useId()` for unique
  `clipPath` ids since it renders more than once per page (ProofBar +
  once per Reviews card) — duplicate SVG ids across instances would corrupt
  each other's clip regions.
- `src/lib/site.ts` also exports `GOOGLE_RATING` (the numeric `4.4`) as the
  single source of truth `StarRating` reads for the fill amount, kept
  separate from the localized display strings in `messages/*.json` — if the
  real rating ever changes, update both, don't let them drift apart.
- `src/lib/site.ts` — `SITE_URL` is a **placeholder domain**
  (`https://fitnessplamen.bg`) since no real production domain is
  configured yet; every canonical/OG/sitemap/robots URL derives from this
  one constant, so swap it here before deploy (Phase 6). Also `SITE_NAME`
  and locale-URL/OG-locale helpers.
- `src/lib/schema.ts` — `buildExerciseGymSchema()` and `buildFaqSchema()`
  JSON-LD builders. **No `aggregateRating` field, ever** — hard prohibition,
  the ~4.4–4.5/177 rating stays visible text only in `ProofBar`. `image` is
  intentionally omitted (no real photography yet).
- `messages/{bg,en,ru,de}.json` also carry two more namespaces since Phase
  4: `meta` (per-locale title/description targeting real search phrasing)
  and `faq` (7 Q&A pairs, answer-first, structurally identical across all
  four locales same as every other namespace).
- `src/app/[locale]/_sections/FAQ.tsx` — new section (added before
  `Footer`), renders the FAQ copy plus a mirrored `FAQPage` JSON-LD block.
  The "when is it least busy" answer is honest and general (mornings
  quieter than evenings), not a fabricated specific hour range.
- `src/app/[locale]/page.tsx` also renders the `ExerciseGym` JSON-LD block
  (kept out of `layout.tsx` so it doesn't leak onto `/styleguide`).
- `src/app/robots.ts` — allows `GPTBot`/`ClaudeBot`/`PerplexityBot`/
  `OAI-SearchBot` plus general crawlers, disallows `/styleguide` and
  `/*/styleguide`. No `llms.txt` — deliberately skipped per CLAUDE.md.
- `src/app/sitemap.ts` — all four locale homepages with full hreflang
  alternates including `x-default` → `/bg`.
- `src/components/SmoothScroll.tsx` — Lenis, mounted once in the locale
  layout. Independently checks `prefers-reduced-motion` via `matchMedia`
  before ever constructing a Lenis instance (the CSS kill-switch alone
  doesn't stop Lenis's JS scroll hijacking).
- `src/components/Reveal.tsx` — the one scroll fade+rise, wrapping
  `ProofBar`/`TheGym`/`Equipment`/`Passes`/`Reviews`/`FindUs`/`FAQ` in
  `page.tsx` (`Hero` and `Footer` excluded). **The GSAP-visibility-without-
  JS guarantee, load-bearing for CLAUDE.md's motion hard rule:** the
  server-rendered wrapper `<div>` carries zero className/style — a no-JS
  visitor gets the section exactly as it rendered, fully visible. GSAP's
  `fromTo()` only ever applies its "from" values via JS inside a mounted
  `useEffect`, gated behind its own reduced-motion check, so a hidden-
  before-visible state never exists in markup. Verified by curling the
  raw SSR'd HTML for all four locales and grepping for `opacity:0`/
  `opacity-0`/inline opacity styles — zero matches. Any future change to
  this component must preserve that property; re-verify with curl+grep,
  don't just trust that it looks right in a browser.
- `src/components/HeroBackground.tsx` — same visibility guarantee, subtle
  scroll-tied scale on the Hero's still-`TODO`-labelled background
  placeholder only (no real photography yet). No text animation.
- `src/app/icon.tsx`, `src/app/opengraph-image.tsx` — code-generated
  favicon/OG image via `next/og`'s `ImageResponse`, palette tokens only
  (`ink`/`blood`/`white`/`steel`), nothing fetched externally, no
  photography. Caught during review: an earlier draft had `color: blood`
  text directly on the `ink` background for "Plamen Gym" — the same red-
  text-on-black violation as the Hero/TheGym fix in Phase 2. Fixed to a
  blood-background/white-text chip; watch for this exact mistake recurring
  anywhere blood is used near ink/black.
- `src/middleware.ts` — matcher also excludes `icon`/`opengraph-image` now
  (they have no file extension in their URL, so without this they'd get
  caught by the locale-prefix redirect and 404).
- Focus-visible rings (`outline`/`outline-offset`, white on dark) added to
  every interactive element: `Button`, `LanguageSwitcher`, and the tel/
  maps/Facebook links in `FindUs`/`Footer`.

Run locally: `npm install`, then `npm run dev` (or `npm run build && npm run
start` to check the production build). `npm run build` and `npx eslint .`
both pass as of this phase. `/`, `/bg`, `/en`, `/ru`, `/de`, and
`/{locale}/styleguide` all resolve; `/` 307-redirects to `/bg` and sets the
`NEXT_LOCALE` cookie.

Update this section again after each phase lands.

## What this is
A 4-language (BG / EN / RU / DE) marketing site for a real, operating gym in
Sunny Beach, Bulgaria. Not a portfolio piece. Not a design experiment. A
conversion tool for tourists who are standing on a beach with a phone,
deciding where to train today.

## The one job of this site
A tourist searches "gym sunny beach" on their phone, lands here, and within
8 seconds knows: this is a real iron gym, it's a few minutes away, it's open
now, and they can walk in today. Everything else is secondary.

## THE BUSINESS — verified facts. Do not invent, do not embellish.
- Name: Fitness Plamen GYM SUNNY BEACH (Cyrillic: Фитнес Пламен)
- Address: Tsentar (Център), 8240 Sunny Beach (Слънчев бряг), Nesebar, Bulgaria
- Phone: +359 87 882 1115
- Hours: 09:00–21:00 daily
- Coordinates: 42.690716, 27.707864
- Google Place ID: ChIJIxshlPafpkARpBnO0sV6nrc
- Facebook: https://www.facebook.com/FITNESSMERCURYSUNNYBEACH/
- Google rating: ~4.4–4.5, **177 reviews — the most of any gym in Sunny
  Beach.** Owner-verified (was previously documented as an unverified
  ~149; corrected and the "most reviewed" claim added this pass — do not
  revert to the old figure).
- Owner: Plamen. Builds many of the machines by hand.
- Passes: day, week, month. **NO PRICES ANYWHERE ON THE SITE.**
- No Instagram account exists. Do not link one.
- **Founded 23 years ago — the oldest continuously-operating gym in Sunny
  Beach.** Owner-verified (was previously unverified — see history below).
  This is a real competitive claim: use it, don't soften it.

Open blockers from the owner (do not fabricate substitutes — see
**Outstanding decisions** below): real gym photos are being supplied
incrementally (see **Photography** below for current status); the "Fitness
Mercury" history and an Instagram decision are unresolved.

## Positioning
The only hardcore old-school bodybuilding and powerlifting gym in Sunny
Beach — and, now verified, both the oldest and the most-reviewed one: 23
years running (longer than any other gym in town) and 177 Google reviews
(more than any other gym in town). Competitors are combat-sports centres
(Max Fight) or modern chains (Pulse), none of which can claim either
tenure or review volume. Nobody else owns "iron temple." Lean into all
three claims completely — "old-school" is no longer just an aesthetic
choice, it's literally true, and it's also the gym most people have
actually reviewed.

Reframe the two recurring criticisms instead of hiding them:
- "equipment is old" → owner-built, maintained, and it works. That is the point.
- "crowded at peak" → tell people the quiet hours. Honesty converts.

## Equipment (client-confirmed, use as-is, do not add anything)
Benches. Leg press. Hack squat. Machine preacher curl + free preacher bench.
Leg curl. Quad extension. Calisthenics park. Boxing area. Cables.
All pulldown variations. Dip machine. Adductor + abductor.
One elbow-style pec dec, one extended-arm pec dec with rear delt.
One travelling smith machine, one standard smith machine.
Dumbbells up to 55 kg. Air conditioning.

**Display treatment (post-launch revision):** the full 16-item list above is
still the complete, real inventory — nothing here was deleted or fabricated.
After live feedback that the equipment section was eating half the page, the
site now shows it as pill/tag chips split into `equipment.highlights` (8
items, the ones a tourist actually searches for — free weights, cables,
calisthenics, boxing, AC) and `equipment.more` (the remaining 8, behind a
native `<details>`/`<summary>` expand). See `messages/{locale}.json` →
`equipment` for the exact current split. If the owner ever wants specific
items removed from the site entirely (not just tucked behind the expand),
that requires an explicit confirmed list from them — don't guess which ones.

## Real reviews — quote only these, verbatim. Never write a fake testimonial.
- Zara P, 5★, Jun 2025: "such a lovely & friendly training environment. This gym
  has everything and more than you could ever need for training not to mention
  that the owner built all of the machinery by hand which is crazy cool.
  Everyone is so helpful and welcoming. Gym has amazing air conditioning not to
  mention how spotless this gym is."
- Toby F, 5★, Aug 2025: "Great gym... every type of equipment you'll need for a
  good training. Machines are a little old, but for me it has more charm to it
  then brand new equipment and it works perfectly. The people who own the gym
  are also lovely." (Strip the £/lev figure from this quote — no prices on site.)
- R D, 5★, Jun 2023: "A true hidden gem, great atmosphere!! and lots of (old
  school) machines. A must visit if you are visiting sunny beach."
- Kevin S, 5★, Aug 2025: "Best gym I've used in sunny beach. I come on holidays
  here every year and I always use this place. Great equipment and the place is
  spotless. Owner is very nice"
- Marcus S, 5★, Jul 2025: "The equipment is on the older side but well kept and
  they have something for all muscle groups... the staff was amazing and kind."

## Stack — do not substitute
Next.js 15 App Router · TypeScript · Tailwind CSS · next-intl · GSAP + Lenis
(marketing motion only) · Vercel. No CMS. No database. No auth. No forms
backend. Content lives in JSON message files (`messages/{bg,en,ru,de}.json`).

## Design system — non-negotiable

### Palette (exact hex, no others)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0A0A` | primary dark surface |
| `--black` | `#000000` | max-contrast blocks |
| `--charcoal` | `#1A1A1A` | dark-on-dark cards, vignettes |
| `--steel` | `#B3B3B3` | secondary text on dark only |
| `--bone` | `#EDEDED` | light sections |
| `--white` | `#FFFFFF` | text on dark |
| `--blood` | `#B10000` | PRIMARY ACCENT — headings, CTAs, rules |
| `--blood-hi` | `#E02020` | large elements only, never text |

Red rules: never set body copy in red; never set red text on black. `#B10000`
passes AAA on white → safe for large headings and CTA fills. `#FF0000` is
banned — it reads "sale sticker," not "blood."

**Palette exception — flag icons only.** `src/components/Flags.tsx`, used
inside `LanguageSwitcher`, uses real national flag colours (Bulgaria/UK/
Russia/Germany) outside the 8-token set above — stakeholder explicitly
confirmed wanting flags despite the conflict. Scope is exactly that one
file. No other component may introduce a hex value outside the palette
table, flags or otherwise.

### Typography
PT Sans Bold — display, ALL CAPS. Sofia Sans — body, weight 400/600. Both
from Google Fonts via `next/font`; self-host the subset. Both render
native Bulgarian and Russian Cyrillic — that is a hard requirement, not a
nice-to-have, since Bulgarian is the default locale and Russian is one of
the four. Set `<html lang>` per locale so Cyrillic letterforms shape
correctly. No other typefaces. No serifs.

Display typeface history, three swaps so far, each a direct response to
live-site feedback: Sofia Sans Condensed (original) → Oswald (Sofia Sans
Condensed read as "wrong personality," too plain/corporate) → Russo One
(Oswald still read as generic/"AI-safe" display-font-of-the-week) → **PT
Sans Bold (current)**, after Russo One was rejected outright ("0/10").
The pattern across all three complaints: a display/poster-genre face
(Oswald, Russo One) reads as a trendy pick, not a real brand's typeface.
PT Sans breaks that pattern deliberately — it's a serious, workhorse
sans-serif (Paratype, built for a Russian government Cyrillic-
modernization project) that real companies use for actual identity work,
not a novelty display face. If this gets rejected too, the next
candidate should stay in that same "quality workhorse grotesque" register
(e.g. Golos Text, PT Sans Caption) rather than swinging back toward
another display/poster face — that whole genre has now been tried twice
and rejected twice. Always verify Cyrillic support before reaching for
anything: rejected for missing Cyrillic entirely (do not reach for these):
Bebas Neue, Anton, Fjalla One, Staatliches, Six Caps, Archivo Black
(confirmed via `next/font/google`'s own TypeScript types refusing a
`cyrillic` subset for Archivo Black).

### Photography
Real photos of this gym only. High-contrast black and white with grain, or
duotone `#0A0A0A → #B10000`. Never colour-corrected stock. **Zero
AI-generated imagery.** If a photo is missing, leave a labelled empty slot in
the code with a `TODO` comment — do not fill it with a placeholder from an
image service.

**Status (in progress, first real photos now live):** owner has been
sending real phone photos directly in chat rather than uploading to the
repo (GitHub's mobile uploader 406'd on the phone's HEIC photos, and a
Google Photos share link is blocked by this environment's egress policy).
Chat images aren't saved to disk automatically in this environment, but
they are recoverable — the raw base64 image data lives inside this
session's own transcript log, decodable and writable to `public/` without
needing a fresh upload. That's how the three photos below got in.

**Committed and live in the site** (`public/logo-supplied.jpg`,
`public/photos/`): owner portrait (selfie, thumbs up — now in `TheGym`),
a close dumbbell-rack/bench shot (now the `Hero` background), and the
supplied logo mark (now in `Footer`). All three are small, chat-compressed
JPEGs, not full-resolution originals — they read a little soft at large
display sizes. Swap the files in `public/` for full-resolution versions
whenever the owner can get them over; nothing else needs to change.

**Committed but not yet placed:** `public/photos/calisthenics-kid.jpg` (a
child using the calisthenics equipment) — no natural slot for it yet
without further section changes.

**Shown in chat but lost, not recoverable:** a wide gym-floor shot, the
entrance area with a painted mural, a covered outdoor training area, and a
t-shirt mockup reading "20+ YEARS" — these appeared in an earlier chat
message whose image data didn't survive in the transcript log (likely
pruned during context compaction). If the owner still wants these used,
they need to be re-sent in a **current** chat message, not re-fetched from
history.

Still short of the 10-shot minimum even counting the recoverable-but-
unplaced one. One additional submitted image (a posed, studio-lit
shirtless physique shot, sunglasses, staged background) was **not**
accepted — it reads as stock photography, not a real photo of this gym,
and needs explicit owner confirmation before it could ever be considered.

### Banned — if any of these appear, the build is wrong
- Neon glows, purple→blue gradients, synthwave, glassmorphism
- Stock photos of smiling people on treadmills
- Fake countdown timers, fake "spots left," fake urgency of any kind
- Fabricated testimonials or invented ratings
- Buttons or links that do nothing. Every interactive element works or is cut.
- Emoji in UI
- Numbered 01 / 02 / 03 section markers
- Drop shadows. Border radius above 4px — **one narrow exception:**
  `rounded-full` pill/tag chips, scoped to exactly two places: the Equipment
  section's tag chips and the language-switcher badges. No other component
  may use any border-radius above 4px, including anything that looks like a
  pill but isn't one of those two.
- Low-contrast grey body text
- Prices

### Motion — hard rule
GSAP must NEVER set `opacity: 0` as a base CSS style. Content is visible by
default; JavaScript only enhances. If JS fails, the page must still read
perfectly. Honour `prefers-reduced-motion: reduce` — disable all motion, no
exceptions. One fade+rise on scroll. Lenis smooth scroll. Nothing else.

## Environment
Windows. Use `py` not `python3`. Use `start` not `open`. Use `pathlib` in any
script. Forward slashes in imports.

## Working rules
- One phase at a time (see **Development workflow**). Do not start the next
  phase unprompted.
- `git commit` after every phase with a descriptive message.
- Run `npm run build` before declaring a phase done. A phase that does not
  build is not done.
- Before touching a file outside the current phase's scope, stop and ask.
- Never claim something works without running it.

## Development workflow — phased build
The site is built in one phase per session; commit after each; do not
combine phases. Full prompt text for each phase lives in the project's build
document — summary of the sequence:

- **Phase 0 — Scaffold.** Next.js 15 + TypeScript + Tailwind + App Router +
  `src/`. Install `next-intl`, `gsap`, `lenis`. Set up `src/app/[locale]/`
  routing, `src/i18n/`, `middleware.ts` (locale detection + `NEXT_LOCALE`
  cookie), empty `messages/{bg,en,ru,de}.json`, `tailwind.config.ts` with the
  palette tokens above, `next/font` for Sofia Sans / Sofia Sans Condensed
  (latin + cyrillic). Verify all four locale routes resolve and
  `npm run build` passes.
- **Phase 1 — Design foundation.** `globals.css` tokens, grain texture
  utility, duotone image filter, type scale, reusable primitives (`Section`,
  `Container`, `Rule`, `Button`, `Eyebrow`), global
  `prefers-reduced-motion` kill switch, temporary `/styleguide` route.
- **Phase 2 — MVP, Bulgarian only, single page.** Hero → proof bar → the gym
  story → equipment grid → passes (no prices) → reviews → find us → footer.
  Static, no animation yet, mobile-first from 375px.
- **Phase 3 — Internationalisation.** Extract strings to
  `messages/bg.json`, produce adapted (not literal) `en`/`ru`/`de` versions,
  build the language switcher, verify identical key sets across all four
  files.
- **Phase 4 — SEO and structured data.** Per-locale metadata, hreflang incl.
  `x-default`, `ExerciseGym` JSON-LD, `FAQPage` JSON-LD, `robots.txt`
  allowing AI crawlers, `sitemap.xml`. No `aggregateRating` in structured
  data (rating is visible text only). No `llms.txt` as a visibility play.
- **Phase 5 — Motion and detail.** Lenis (disabled under reduced-motion), one
  scroll fade+rise from a visible base state (verify with JS disabled),
  hover states on CTAs only, focus rings, tap targets, favicon, OG image.
- **Phase 6 — Verification and deploy.** Full QA checklist, then Vercel
  deploy, verify all locales + hreflang live, submit sitemap to Search
  Console, run Rich Results Test.
- **Phase 7 — Stakeholder revision pass (post-launch).** Live-site feedback
  addressed: display typeface swapped (Sofia Sans Condensed → Oswald,
  Cyrillic verified), Equipment condensed into expandable pill chips,
  FAQ trimmed 7→5 and converted to a real accordion, language switcher
  relocated to a persistent top bar (no flags — palette conflict, flagged
  as an open decision), ProofBar and Reviews rebuilt with real visual
  weight (large numerals, star icons) instead of thin strips. Same
  discipline as every other phase: build must pass, `design-critic` audit
  before commit, exact same verified facts (no new numbers invented).
- **Phase 8 — First real content (post-launch).** The founding-year
  claim moved from unverified placeholder to owner-verified fact: 23
  years, oldest gym in Sunny Beach, now leading `ProofBar` and opening
  `TheGym`'s story. First real photography and the owner's logo landed —
  recovered from this session's own chat transcript after both direct
  upload paths (GitHub mobile, a Google Photos link) failed, rather than
  blocking on a third attempt. See **Photography** in the Design system
  section for exactly what's live, what's saved-but-unplaced, and what
  didn't survive to be committed.
- **Phase 9 — second direct revision round (post-launch).** More live
  feedback, addressed fast: display face swapped twice more (Oswald →
  Russo One → PT Sans Bold — see Typography's swap history, both
  Cyrillic-verified via the generated `@font-face` `unicode-range` before
  shipping), language switcher stripped to flags-only (text kept
  `sr-only` for accessibility), `TheGym`'s heading accent chip moved onto
  its own line (the real bug behind a "text overlapping" report — an
  inline accent phrase let the browser break the line inside the red
  chip, not the copy length), `TheGym`'s paragraphs tightened again, and
  English's "Call" CTA became "Call us". Same discipline held under
  pressure: every change still build-verified and screenshotted at
  375-390px in a real headless browser before being reported as fixed,
  not just claimed.

## Sub-agents
This project uses narrow, single-purpose agents defined in
`.claude/agents/`. Use the one matching the work instead of doing
general-purpose implementation:

| Agent | Use for |
|---|---|
| `site-builder` | Building Next.js pages/layout/components |
| `copy-localizer` | Writing/maintaining BG/EN/RU/DE copy in message JSON |
| `seo-schema` | Metadata, hreflang, JSON-LD, sitemap, robots.txt |
| `design-critic` | Auditing built UI against the banned-pattern list (run at end of every visual phase) |
| `qa-verifier` | Build/perf/accessibility/no-JS verification (run before deploy) |

See each agent's file for its full brief and hard prohibitions.

## Marketing — the part that actually moves rankings
For a single-location local business the Google Business Profile is the
lever, not the website. Priority order: (1) claim/verify the GBP with
accurate hours and photos, (2) fix the NAP (name/address/phone)
inconsistency — the Facebook page is still `/FITNESSMERCURYSUNNYBEACH/` and
must be reconciled with the current name everywhere it's listed, (3) drive
multilingual reviews (German, Russian) so the profile surfaces for
non-English searches, (4) post to Facebook weekly in season, (5) consider
`/ro` and `/pl` locales later if analytics show demand (Romania is
Bulgaria's largest tourist source market). Skip `llms.txt` as a growth
tactic — it's unsupported by Google and unused by AI crawlers; clean
semantic HTML and real FAQ content do the actual work.

## Outstanding decisions (blockers — do not paper over with invented content)
1. ~~Founding year~~ **RESOLVED.** Owner-verified: 23 years, oldest
   continuously-operating gym in Sunny Beach. See **THE BUSINESS** and
   **Positioning** above — this is now a real fact to market, not a
   placeholder.
2. Real gym photography (min. 10 shots) — **in progress, 3 live.** A Hero
   background photo, an owner portrait, and one more saved-but-unplaced
   shot are committed to the repo and (for the first two) wired into the
   site — see **Photography** below for the full received/committed/used
   breakdown, including which chat-shared photos didn't survive to be
   committed and need re-sending. One submitted image (a posed,
   studio-lit shirtless physique shot) reads as stock photography rather
   than a real photo of this gym or its owner — excluded pending explicit
   confirmation from the owner that it's genuine and who it is.
3. Logo — **shipped as-supplied, redesign still open.** The owner's
   existing logo mark (red fist/bicep icon + wordmark) is live in the
   footer, used exactly as supplied rather than redesigned, because
   shipping something real now beat blocking on a design decision. A
   matching t-shirt design reading "20+ YEARS" was also supplied
   (consistent with the now-confirmed 23-year history, likely just not
   yet updated on the merch). Still undecided: leave the logo as-is, or
   redesign it to match the site's exact palette (`#B10000` not whatever
   red the supplied asset uses) and Oswald typography for visual
   cohesion with the rest of the site.
4. Whether/how to mention the "Fitness Mercury" history.
5. Whether to create an Instagram account or omit it entirely.
6. Whether the no-prices rule holds — the day rate is already public via a
   Google review, so omitting it on-site mainly adds friction. If the owner
   still declines, compensate by making the phone CTA prominent with
   "call for prices" in all four languages.

## Known risk to handle carefully
One negative review (oink.bg, Jul 2025) alleges a physical altercation over
unreturned mats — an outlier against ~123 five-star reviews, but reason
enough to (a) not build the brand voice entirely around the owner's
personality without meeting him first, and (b) add a short, positively
framed house-rules line (re-rack weights, wipe down the bench) that
pre-empts the friction described.

## Deliberate house-style break
This project intentionally departs from Swiss editorial minimalism: pure
black/white, saturated red, grain, heavy condensed caps. That's correct for
a hardcore gym brand — don't soften it toward "quietly expensive." What does
carry over from other projects and must not be dropped: the GSAP-visibility
rule (no `opacity:0` base state) and the no-dead-buttons rule.
