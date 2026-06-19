# Phase 3 — Build Spec (handoff for a fresh session)
**Project:** mazenelbawab.com redesign — scroll-driven narrative with the "Builder Maz" character.
**Read alongside:** `asset-pipeline/phase2-prompts.md` (the asset pipeline + the 8 clip build set).
**This file captures the decisions made in planning that are NOT otherwise in the repo.** Start here.

---

## 0 · How to start this session
- Branch: create `phase3-build` **off `assets/character-bible-phase2`** (NOT off main) — that branch has the character assets, the Git LFS setup, and both spec docs. The old site on `main` stays live until cutover.
- Git LFS is configured (`*.png/*.jpg/*.jpeg/*.mp4` → LFS). If `git lfs` reports "not installed," the binary is at `~/.local/bin/git-lfs` (add to PATH) or run `sudo apt install git-lfs`.
- Two open decisions to confirm with the user before integrating the character (see §9).

## 1 · Stack (approved)
- **Astro** (static output) + **Lenis** (smooth scroll) + **GSAP ScrollTrigger** (pin/scrub/choreography). **No React. No Three.js** — the hero is pre-rendered, not real-time 3D.
- Body font **Inter**, display **Cabinet Grotesk**, numbers/labels **JetBrains Mono**.
- Deploy: GitHub Actions → GitHub Pages. Preserve `CNAME` (www.mazenelbawab.com). Astro `site`/`base` set accordingly.
- Why Astro over Next: zero-JS by default; our interactivity is imperative (GSAP/Lenis/canvas), not component-state — it hydrates only the islands that need it (dynamic fetchers). Keeps the JS budget for character assets, not framework runtime.

## 2 · Information architecture — KEEP the existing sections, change how they feel
One continuous scroll document (not tabs). Order:
1. **Hero** — intro, headline, CTAs (Get In Touch / LinkedIn / Resume)
2. **Key Highlights** — stats strip + capability cards
3. **My Journey** — pinned career journey (the set piece)
4. **Latest Articles** — Medium feed (dynamic) — **RE-ENABLE** (was `showBlog:false`)
5. **Highlights** — Patents/Awards/Recognitions + GitHub projects (dynamic)
6. **Contact** — connect links + Formspree message form

**Navigation:** keep the nav items (Home / My Journey / Highlights / Blog / Contact). They behave tab-like on a continuous page: click = smart-jump to section (fast accelerated scroll / near-instant past pinned beats, ~300–500ms, so a recruiter isn't trapped). Add **scroll-spy** (active item updates on scroll). **Preserve hash deep-links** (`#journey`, `#contact`, etc.). No-JS / reduced-motion = discrete calm sections (the old tab experience).

## 3 · Content source
Port everything from `config.js` (it's clean, keep its shape): `personal`, `features`, `resume`, `medium`, `github`, `home.{heroIntro,intro,stats,highlights,recognitions}`, `journey.{intro,timeline}`. In Astro, expose as a typed content/data module.
- **Keep the contact obfuscation** (`contact-security.js`): base64-split email/phone, honeypots, timing check, interaction-gate, Formspree (id base64 in config). Port as a hydrated island.
- Dynamic **Medium** via rss2json (`home`/`app.js` has the fetch) — graceful loading/empty/error states. Dynamic **GitHub** repos via API — same. These keep working.

## 4 · Art direction — "Workshop at Dusk" (single dark theme; retire the light/dark toggle)
| Token | Hex | Use |
|---|---|---|
| Base | `#0B0F1A` | page background (deep ink) |
| Surface | `#1E2638` | cards / raised surfaces (tool-steel slate) |
| Text | `#F2EFE9` | body (warm paper) |
| Accent — amber | `#F5A146` | the *physical/maker* accent; character key light |
| Accent — cyan | `#5BC8DF` | the *digital/software* accent; all holographic UI |
The amber↔cyan duality maps 1:1 to the hardware-founder / software-leader brand and the character's hybrid tool belt. Hairline rules, generous space, restraint.

## 5 · Character integration (hero pre-rendered; everything else frame sequences or still+GSAP)
- **Hero (no WebGL):** P1 poster = instant placeholder → **C2 wave** plays once on load → cross-fades into **C1 idle** (boomerang loop). **Cursor tracking:** `Look_T1–T3` frames (generate-one-side; mirror with `scaleX(-1)` for the other side; `Look_T0`/P1 = center), cross-faded by cursor X. **Parallax:** `bg_base` (opaque backdrop), `bg_blueprint` + `fg_motes` (generated on black, composited `mix-blend-mode: screen`), shifting a few px on pointer.
- **My Journey (set piece):** pinned section; the character travels through eras. **8 build clips** become scroll-scrubbed `<canvas>` frame sequences (Apple technique). Strict chronology, 4 stations: **Garage (Heddoko 2012–17)** → **Studio-1 (Ubisoft 2017–21)** → **Tower (Brex 2021–24)** → **Director/present (Ubisoft 2024–)**. A **prologue (2006–2012)** renders as 3 small "measurement-mark" tags on the timeline line during pin-in (Siemens&Cynovad 2006–07 · Ubisoft&Behaviour 2007–12 · consulting 2012–14), expand on hover/tap. Milestone cards dock in as he reaches each station.
- **Other beats (Articles / Highlights / Contact):** **still + GSAP**, not video — pose stills (P10, P11, P12) revealed/parallaxed on scroll, with environment effects (cards sliding, frames pinning) as GSAP/CSS/canvas. (The 12 annex clips in phase2 doc are reference only.)
- **Blueprint-line motif:** ONE tall SVG path, ~1.5px amber stroke, drawn via `stroke-dashoffset` scrubbed to page progress — doubles as the scroll progress indicator, the Journey timeline spine, and the card-build scaffold. **Graybox it first**; if it reads as noise, demote to Journey-only (nothing else depends on it).
- **AI companion ("Bit"):** Medium presence only — born from the monitors at the AI-present Journey beat (~84%), and present at the Contact send-off. Era-locked: doesn't exist before the AI-present beat (that's the thesis — 18 years building before the AI arrived).
- Character is decorative: `aria-hidden`, all content readable without it.

## 6 · Motion / sequence architecture
- Lenis + GSAP ScrollTrigger for all pin/scrub. All narrative motion is **scroll-scrubbed** (visitor controls time), never autoplay — except the hero idle and any ambient loops.
- Frame sequences: **28 frames desktop @1440px / 14 frames mobile @720px**, AVIF primary + WebP fallback, at `assets/seq/<clipId>/<d|m>/frame_###.avif`. Decode + draw to `<canvas>`; ScrollTrigger maps scroll → frame index. Lazy-load per section via IntersectionObserver with a budget.
- Scrubbed clips need no loop (scroll up = reverse). The 4 autoplay loops (C1, C12, C14, C17) use post **boomerang** (see phase2 §4.6).

## 7 · Non-negotiable quality gates
- 60fps scroll on mid-range Android. Lighthouse **Perf ≥ 85 mobile / ≥ 95 desktop**.
- **`prefers-reduced-motion`:** full static-but-beautiful fallback — key poses as illustrations, no pinning, no scroll-jacking.
- **Mobile-first responsive:** journey becomes vertical with simplified sequences — designed, not just shrunk.
- **Accessibility:** semantic HTML, keyboard navigable, all content readable without JS/WebGL.
- **Dynamic Medium + GitHub** keep working with graceful loading/empty/error states.
- **SEO/meta** preserved or improved; **OG image features the character** (use OG.png).
- **Initial payload < 2 MB** before lazy sequences.

## 8 · Anti-goals (reject even if cool)
Scroll-jacking that traps the user · autoplay audio · loading screens > 1.5s · parallax soup · text that animates so much it can't be read · anything that makes a recruiter on a train wait.

## 9 · Open decisions to confirm before character integration
1. **V1 vs V2 character bible** — both exist (`asset-pipeline/images/V1/` and `/V2/`). Pick the canonical one for the build (affects which P1/poses/Look frames + clips to wire in). Scaffolding can proceed without this.
2. **Clips in flight** — the 8 build clips are being generated by the user; integrate via the frame-sequence pipeline (phase2 §4) as they land. Build with placeholder stills (the P-poses) until clips arrive.

## 10 · Suggested Phase 3 order
1. Astro scaffold + GH Actions→Pages + CNAME + fonts + design tokens (palette/type as CSS vars).
2. Port `config.js` → content module; build all 6 sections as static, semantic, fully readable (no motion yet). Re-enable blog. Port contact-security + Formspree + dynamic Medium/GitHub islands.
3. Lenis + ScrollTrigger; nav scroll-spy + smart-jump + hash deep-links.
4. Graybox the blueprint line; review.
5. Hero (poster → wave → idle → cursor look + parallax).
6. Journey pin + canvas sequence scrubbing (placeholder stills → real clips as they arrive).
7. Responsive + reduced-motion fallbacks; lazy-load budget.
8. Perf pass, Lighthouse, cross-device QA, cutover.
