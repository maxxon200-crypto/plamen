# PROJECT: Fitness Plamen GYM Sunny Beach

## Repository state (read this first)
**Phase 0 (scaffold) is done.** Phases 1–6 are not — there is no design
system, no page content, no i18n copy, no SEO/schema, no motion yet. Treat
the rest of this file as the spec the remaining phases must be built to
conform to. Do not jump ahead and start Phase 2+ work unprompted.

What exists right now:
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v3 + ESLint, scaffolded
  into `src/`, no Turbopack.
- `src/app/[locale]/` — `layout.tsx` sets `<html lang>` per locale, wraps
  children in `NextIntlClientProvider`, loads the Sofia Sans / Sofia Sans
  Condensed font variables. `page.tsx` is a stub (`return null`) — no UI yet,
  by design (that's Phase 2).
- `src/i18n/routing.ts` — next-intl `defineRouting`, locales
  `['bg','en','ru','de']`, default `bg`.
- `src/i18n/request.ts` — next-intl `getRequestConfig`, loads
  `messages/{locale}.json`.
- `src/middleware.ts` — next-intl middleware, locale detection +
  `NEXT_LOCALE` cookie persistence, matcher excludes `api`/`_next`/files.
- `src/lib/fonts.ts` — `next/font/google` for Sofia Sans (400/600) and Sofia
  Sans Condensed (800), latin + cyrillic subsets, self-hosted at build time.
- `messages/{bg,en,ru,de}.json` — all empty `{}` for now (Phase 3 fills these).
- `tailwind.config.ts` — palette tokens (`ink`, `black`, `charcoal`, `steel`,
  `bone`, `white`, `blood`, `blood.hi`) and `font-sans`/`font-condensed`
  mapped to the Sofia Sans CSS variables. Tailwind v3 (config-file-based),
  not v4 — chosen so the palette lives in one typed `tailwind.config.ts`
  rather than a CSS `@theme` block.
- `public/` is currently empty — the default create-next-app SVG placeholders
  were removed since nothing references them and this project doesn't use
  placeholder imagery (see **Photography** below).

Run locally: `npm install`, then `npm run dev` (or `npm run build && npm run
start` to check the production build). `npm run build` and `npx eslint .`
both pass as of this phase. `/`, `/bg`, `/en`, `/ru`, `/de` all resolve;
`/` 307-redirects to `/bg` and sets the `NEXT_LOCALE` cookie.

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
- Google rating: ~4.4–4.5, ~149 reviews
- Owner: Plamen. Builds many of the machines by hand.
- Passes: day, week, month. **NO PRICES ANYWHERE ON THE SITE.**
- No Instagram account exists. Do not link one.

Open blockers from the owner (do not fabricate substitutes — see
**Outstanding decisions** below): the "20 years" founding claim is
unverified; real gym photos are not yet supplied; the "Fitness Mercury"
history and an Instagram decision are unresolved.

## Positioning
The only hardcore old-school bodybuilding and powerlifting gym in Sunny
Beach. Competitors are combat-sports centres (Max Fight) or modern chains
(Pulse). Nobody else owns "iron temple." Lean into it completely.

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

### Typography
Sofia Sans Condensed — display, ALL CAPS, tight tracking (`-0.02em`), weight
800. Sofia Sans — body, weight 400/600. Both from Google Fonts via
`next/font`; self-host the subset. Sofia Sans renders native Bulgarian
Cyrillic — that is why it was chosen. Set `<html lang>` per locale so
Bulgarian letterforms shape correctly. No other typefaces. No serifs.

### Photography
Real photos of this gym only. High-contrast black and white with grain, or
duotone `#0A0A0A → #B10000`. Never colour-corrected stock. **Zero
AI-generated imagery.** If a photo is missing, leave a labelled empty slot in
the code with a `TODO` comment — do not fill it with a placeholder from an
image service.

### Banned — if any of these appear, the build is wrong
- Neon glows, purple→blue gradients, synthwave, glassmorphism
- Stock photos of smiling people on treadmills
- Fake countdown timers, fake "spots left," fake urgency of any kind
- Fabricated testimonials or invented ratings
- Buttons or links that do nothing. Every interactive element works or is cut.
- Emoji in UI
- Numbered 01 / 02 / 03 section markers
- Drop shadows. Border radius above 4px.
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
1. Founding year for the "20 years" claim — unverified, do not ship as fact.
2. Real gym photography (min. 10 shots) — required before the photography
   sections can leave `TODO` placeholders.
3. Whether/how to mention the "Fitness Mercury" history.
4. Whether to create an Instagram account or omit it entirely.
5. Whether the no-prices rule holds — the day rate is already public via a
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
