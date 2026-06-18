# Phase 2 — Asset Generation Package
**Project:** mazenelbawab.com redesign · "Builder Maz"
**Palette:** Workshop at Dusk (ink #0B0F1A · amber #F5A146 · cyan #5BC8DF)
**Status:** likeness locked · prompts fully inlined — every block below is complete and copy-paste-ready on its own.

---

## HOW TO USE THIS DOC

Every prompt below is **self-contained** — copy one fenced block, attach the listed image(s), paste, generate. No assembling from multiple sections.

**Workflow order:**
1. Generate **T1** first (attach: reference photo only). Iterate until the likeness convinces you at thumbnail AND at 2× zoom. T1 becomes the canonical reference and the locked body.
2. **Expressions** (§1.2): edits of T1 — attach **approved T1 ONLY**.
3. **Poses** (§1.3): edits of T1 — attach **approved T1 ONLY**. (Proven working — this is the core technique.)
4. **Hero look-frames** (§2.2): edits of P1 — the cursor-tracking set for the pre-rendered hero.
5. **Turnaround** (§1.1): optional/reference-only now (no 3D model consumes it) — 2D rotate-edits of T1 if you want them.
6. Seedance clips (section 3), Tier 1 first — attach the listed approved pose still.
7. ffmpeg conversion (section 4) → asset review checklist (section 5).

**The through-line: generate from scratch exactly once — for T1. Everything else is an edit of T1 (poses, expressions, turnaround) or an edit of a pose (hero look-frames from P1). The hero is pre-rendered; there is no real-time 3D.**

**QA rules (read once, they're baked into the prompts):**
- **Generate vs. edit — this is the fix for proportion drift.** A "render the same character" prompt re-synthesizes the body and drifts. An *edit* prompt ("Edit this image — keep proportions EXACTLY, change only the pose") preserves the body. Turnaround/expressions are generations (the viewpoint genuinely changes); poses are edits of T1. For edits, attach ONLY the image being edited — adding the reference photo invites the model to renegotiate proportions.
- **Branch, never chain:** every image derives from T1. Never use a derived image (a pose, an expression) as the source for another — drift compounds like photocopies.
- **Locked identity features** — if one drifts on an otherwise good image, fix with a targeted follow-up edit instead of re-rolling: face geometry · double-bridge silver aviators · beard pattern with gray at the tip · charcoal hoodie · belt contents · sneakers. Fabric folds, exact hand positions and backdrop tone may vary freely.
- **Drift-fix edit prompt:** `Match the ___ exactly to the attached reference image — change nothing else in the image.`
- **Background-fix edit prompt** (model insists on adding a lab/workshop): `Keep the character exactly the same — same pose, outfit, lighting on him. Replace the entire background with a single flat, empty, light-grey backdrop. Remove all furniture, props, equipment and scenery behind him.`
- A stubborn background on an otherwise perfect still is acceptable — rembg strips it (section 4); only pose stills feed Seedance where background matters.

---

## SOURCE OF TRUTH (do not copy from here — already baked into every prompt below)

**`MAZ_BUILDER_V1` likeness (locked):** oval face with structured jawline, visually elongated by a dense full black beard with coarse texture and salt-and-pepper graying concentrated at the chin and beard tip, fading on the cheeks; short buzz cut with skin fade, dark brown/black with faint graying at the sides; large thin-framed silver metal aviator-style glasses with a prominent straight double bridge and clear lenses; dark brown almond-shaped deep-set eyes with pronounced smile crinkles at the outer corners; thick dense dark naturally-arched eyebrows just above the glasses frame; prominent straight nose with a rounded, slightly broad tip; wide genuine smile showing upper teeth, thin upper lip, fuller lower lip, prominent nasolabial smile lines; light-brown, warm olive complexion; mid-40s.

**Outfits:** BASE = open charcoal-grey zip hoodie over heather-grey henley, dark indigo jeans, grey-and-white sneakers, brown leather hybrid tool belt (small steel wrench, metal calipers, softly glowing translucent cyan tablet). GARAGE / STUDIO-1 / TOWER variants appear only inside poses P5–P8. DIRECTOR = BASE.

**`BIT_V1` companion:** fist-sized irregular translucent polyhedron like a cut gemstone, glowing digital-cyan glass with a soft brighter core, two simple friendly curved eyes glowing on one facet; no mouth, no limbs; hovers with a gentle bob; reads as a precision tool he built, not a cartoon sidekick.

If you ever need to change any of the above, change it here AND regenerate the inlined prompts (ask Claude to re-emit the doc).

---

## 1 · NANO BANANA PROMPTS — 25 images total

| Asset | Images | Outfit |
|---|---|---|
| Turnaround T1–T4 | 4 | BASE |
| Expressions E1–E8 | 8 | BASE |
| Poses P1–P4, P10–P12 | 7 | BASE |
| Poses P5–P6 | 2 | GARAGE |
| Pose P7 | 1 | STUDIO-1 |
| Pose P8 | 1 | TOWER |
| Pose P9 | 1 | DIRECTOR + BIT_V1 |
| OG image | 1 | BASE |

### 1.1 Turnaround — 2:3 portrait

> **Turnaround is now OPTIONAL / reference-only.** With the hero pre-rendered (no 3D model) and every asset generated as an edit of T1, nothing on the site actually *consumes* a turnaround — T1 is the consistency reference, and the back view (T4) is never shown. Generate these only if you want a fuller character bible for your own reference, or an alternate hero angle. If you do, use the **rotate-edit** prompts below (attach T1 only); they preserve the body and just change the camera angle. The back of the head is invented but consistent. Skip without consequence if you don't need them.

**T1 — canonical front** · *attach: reference photo only*
```text
Using the attached reference photo of the man, create a 3D-rendered Pixar-style animated character version of him. Feature-film animation quality: stylized proportions with a slightly oversized head, large expressive eyes, soft subsurface-scattering skin with a warm glow, soft even character-sheet lighting. Preserve his recognizable likeness: oval face with structured jawline, visually elongated by a dense full black beard with salt-and-pepper graying concentrated at the chin and beard tip, fading on the cheeks; short buzz cut with skin fade, dark with faint graying at the sides; large thin-framed silver metal aviator-style glasses with a prominent straight double bridge and clear lenses; dark brown almond-shaped deep-set eyes with pronounced smile crinkles; thick dark naturally-arched eyebrows just above the glasses frame; prominent straight nose with a rounded tip; wide genuine smile, thin upper lip, fuller lower lip; light-brown, warm olive complexion; mid-40s. He wears an open charcoal-grey zip hoodie over a heather-grey henley, dark indigo jeans, clean grey-and-white sneakers, and a brown leather hybrid tool belt holding a small steel wrench, metal calipers, and a softly glowing translucent cyan tablet. Friendly, confident, warm expression. Shot: official character model sheet style — full body, standing, relaxed A-pose with arms slightly away from the body, palms forward, feet shoulder-width apart, front view, on a completely flat, empty, uniform light-grey background with no environment, no props, no furniture and no scenery of any kind; the only object in the image is the character himself, fully visible head to feet. NOT hyperrealistic, NOT low-poly, no uncanny valley, no text, no watermark, no extra characters.
```

**T2 — ¾ left** *(optional)* · *attach: approved T1 ONLY*
```text
Edit this image: rotate the camera around this exact character to a three-quarter view facing his left, as if turning him on a turntable. Keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, every prop on the tool belt, rendering style, A-pose and the flat light-grey background EXACTLY the same — this is the SAME character from a new angle, not a new character. Full body visible head to feet. No text, no extra characters.
```

**T3 — profile left** *(optional)* · *attach: approved T1 ONLY (or T2 for a smaller rotation step)*
```text
Edit this image: rotate the camera around this exact character to an exact left profile (side) view, as if continuing to turn him on a turntable. Keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, every prop on the tool belt, rendering style, A-pose and the flat light-grey background EXACTLY the same — the SAME character from a new angle, not a new character. Full body visible head to feet. No text, no extra characters.
```

**T4 — back** *(optional, rarely needed — never shown on the site)* · *attach: approved T1 ONLY (or T3 for a smaller rotation step)*
```text
Edit this image: rotate the camera around this exact character to a view from directly behind, as if completing the turntable rotation. Keep his buzz cut with skin fade, head-to-body proportions, build, outfit, tool belt and rendering style EXACTLY the same — the SAME character seen from the back, not a new character. Same relaxed A-pose, flat light-grey background, full body visible head to feet. No text, no extra characters.
```

### 1.2 Expression sheet — chest-up · *each: attach approved T1 ONLY (NO reference photo)*

These are **edits of T1** — keep the face's identity locked and change only the expression muscles, which also keeps the likeness from re-rolling. The 8 blocks are identical except the final expression phrase.

**E1 — warm open smile**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: a warm open smile, looking directly at the camera. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E2 — focused concentration**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: focused concentration, a slight frown of effort, eyes looking down at his hands. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E3 — quiet pride**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: quiet pride, a small satisfied smile, chin slightly raised. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E4 — delighted surprise**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: delighted surprise, eyebrows raised, bright wide eyes, mouth slightly open in a smile. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E5 — thoughtful**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression and add one hand. New expression: thoughtful, one hand resting on his beard, eyes looking up and to the side. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E6 — welcoming**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: welcoming, head slightly tilted, a soft gentle smile. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E7 — determined**
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his facial expression. New expression: determined, jaw set, confident steady gaze straight ahead. Keep the soft even character-sheet lighting. No text, no extra characters.
```

**E8 — apologetic shrug** *(used for the site's error states)*
```text
Edit this image — keep his facial identity and features (same face shape, silver double-bridge aviator glasses, beard, eyes, nose), head-to-body proportions, outfit, rendering style and the flat light-grey background EXACTLY as they are. Crop to a chest-up portrait and change ONLY his expression and pose. New expression: an apologetic friendly shrug, shoulders raised, palms turned slightly up at chest height, sheepish smile. Keep the soft even character-sheet lighting. No text, no extra characters.
```

### 1.3 Pose sheet — full body, 2:3 portrait · *each: attach approved T1 ONLY (NO reference photo)*

> **Approach changed — these are EDITS of T1, not fresh generations.** A "render the same character" prompt re-synthesizes the whole body every time, which is exactly why proportions drift pose-to-pose. An *edit* preserves the pixels it isn't told to change, so the build stays locked. Two rules that matter:
> 1. **Attach ONLY approved T1.** Do NOT attach the reference photo here — it gives the model permission to renegotiate the proportions. The photo's job ended at T1.
> 2. **Branch from T1 every time.** Never edit one pose into another; drift compounds.
>
> Poses use the site's cinematic lighting (amber key left, cyan rim right) so the stills grade-match the page. Named props only — no environments.
>
> **If a pose comes back rubbery,** re-run the edit (low temperature if available), or generate a 2×3 pose sheet from T1 in one canvas and crop the cell you need — models hold proportions better within a single image than across generations.

**P1 — hero poster (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting. New pose: standing relaxed, holding the glowing cyan tablet in his left hand, looking toward the camera with a warm smile, full body visible head to feet. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P2 — hero wave (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting. New pose: standing, mid-wave with his right hand raised beside his head, friendly open smile toward the camera, full body visible head to feet. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P3 — walk profile (BASE, walk-cycle seed)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting. New pose: walking left-to-right in exact side profile, mid-stride with natural arm swing, carrying the glowing cyan tablet in his far hand, relaxed confident expression, full body visible head to feet. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P4 — card construction (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting, and add one prop. New pose: crouched slightly, lifting a glowing translucent rectangular panel about the size of a poster with both hands, focused expression. Add ONLY the glowing panel — no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P5 — Heddoko garage station (GARAGE outfit)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, rendering style and the flat light-grey background EXACTLY as they are. Change the outfit, pose and lighting. New outfit: a heather-grey henley with sleeves rolled to the elbows (no hoodie), a dark canvas work apron with faint solder marks, dark indigo jeans, work boots, safety glasses pushed up on his head, and a brown leather tool belt holding a soldering iron, a small steel wrench, and fabric snips. New pose: seated on a simple stool, leaning forward and soldering a connection on a piece of dark smart fabric draped over his knee, tiny glowing amber points of light on the fabric, focused expression — add ONLY the stool, soldering iron and fabric, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P6 — era transition, carrying data (GARAGE outfit)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, rendering style and the flat light-grey background EXACTLY as they are. Change the outfit, pose and lighting. New outfit: a heather-grey henley with sleeves rolled to the elbows (no hoodie), a dark canvas work apron with faint solder marks, dark indigo jeans, work boots, safety glasses pushed up on his head, and a brown leather tool belt holding a soldering iron, a small steel wrench, and fabric snips. New pose: standing, holding a glowing translucent card-sized hologram in both hands at chest height, looking at it with quiet pride — add ONLY the glowing card hologram, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P7 — Ubisoft '17–21 station (STUDIO-1 outfit)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, rendering style and the flat light-grey background EXACTLY as they are. Change the outfit, pose and lighting. New outfit: an open charcoal-grey zip hoodie over a dark tee, dark indigo jeans, clean sneakers, a gaming headset resting around his neck, and a brown leather tool belt holding a small steel wrench and a softly glowing translucent cyan tablet. New pose: standing, pointing at something off-screen to the upper right with his right hand, the glowing tablet in his left hand, engaged energetic expression, full body visible. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P8 — Brex tower station (TOWER outfit)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, rendering style and the flat light-grey background EXACTLY as they are. Change the outfit, pose and lighting. New outfit: an open charcoal-grey zip hoodie over a crisp dark collared shirt, dark tailored trousers, minimal clean sneakers, and a slim brown leather belt pouch holding a softly glowing translucent cyan tablet and a metal pen. New pose: standing, sliding a glowing translucent card into a floating slot of cyan light beside him at shoulder height, precise careful gesture, calm focus — add ONLY the glowing card and the floating slot of light, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P9 — AI-present station (BASE outfit + companion)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change the pose and lighting, and add props. New pose: standing at a simple drafting board, sketching with a pencil of cyan light, both looking at the drawing. Add a small floating companion at his right shoulder: a fist-sized irregular translucent polyhedron like a cut gemstone, made of glowing digital-cyan glass with a soft brighter core and two simple friendly curved eyes glowing on one facet — no mouth, no limbs, reads as a precision tool he built, not a cartoon sidekick. Add ONLY the drafting board, the light-pencil and the companion — no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text.
```

**P10 — reading nook (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting, and add props. New pose: seated on a simple wooden stool at a bare drafting table, sliding a glowing translucent card across the table toward the camera with two fingers, friendly look to camera — add ONLY the stool, the bare table and the glowing card, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P11 — workshop wall pin (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting, and add one prop. New pose: reaching up to pin a brass-cornered picture frame to an invisible wall at head height, straightening it with two fingers, satisfied expression — add ONLY the brass-cornered frame, no wall texture, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

**P12 — contact, business card (BASE)**
```text
Edit this image — keep his face, glasses, beard, hair, head-to-body proportions, build, outfit, rendering style and the flat light-grey background EXACTLY as they are. Change ONLY the pose and lighting, and add one prop. New pose: facing the camera squarely, extending a small blank business card toward the viewer with one hand, warm genuine smile — add ONLY the business card, no other objects. New lighting: warm amber key light from the left, faint cool cyan rim light from the right. No text, no extra characters.
```

### 1.4 OG / social image — 16:9, 1200×630 · *attach: reference photo + approved T1*
```text
This is the character (attached). Render the SAME character — identical face, silver double-bridge aviator glasses, black beard with gray at the chin and tip, buzz cut, proportions and Pixar-style rendering. He wears an open charcoal-grey zip hoodie over a heather-grey henley, dark indigo jeans, grey-and-white sneakers, and a brown leather tool belt holding a small steel wrench, metal calipers, and a softly glowing translucent cyan tablet. Shot: cinematic 16:9 wide composition — he stands at a workbench in a dark workshop at dusk, inside a warm pool of amber lamplight, a faint cyan holographic blueprint floating to his right, looking at the camera with a warm confident smile. Leave the left third of the frame as generous, dark, empty space for a name headline. Deep ink-blue darkness (#0B0F1A) at the edges. No text, no watermark, no extra characters.
```

---

## 2 · HERO — pre-rendered (decided: no real-time 3D)

The hero is built entirely from pre-rendered frames — same visual language as the rest of the site, no WebGL/GLB/Mixamo. Interactivity ("alive, tracks me, waves") is faked with frame-swapping + parallax. Three asset groups, all derived from existing bible stills:

**2.1 Motion clips (already in Tier 1 — no extra generation):**
- **C2 — wave on load:** plays once when the page loads, then holds on the last frame.
- **C1 — idle loop:** the resting state after the wave; loops subtly forever (breathing, slow blink, tablet-glow flicker).

**2.2 Cursor "look" frames — generate ONE side, mirror for the other**

> **Why this is structured oddly:** image models (nano-banana included) can't reliably tell left from right — "his left" vs "viewer's right" comes out random no matter how precise the prompt. So **don't ask it for a direction.** Ask only for how *far* the head turns, let it pick a side, and get the opposite side by **horizontally mirroring** the result (CSS `transform: scaleX(-1)` at runtime — zero extra assets, perfectly symmetric).
>
> Generate the 3 blocks below as edits of P1. Whichever way the head ends up turned, save them as the `−` set; the build mirrors them for the `+` set. `look_0` (center) = P1. Net result on screen: 7 positions from 3 generations.
>
> Keep the turns **modest** — a full mirror also flips the body (tablet appears to swap hands) and the lighting (amber key swaps sides); at small magnitudes inside a fast cursor cross-fade that's imperceptible. (Purist option if it ever bothers you: regenerate this set head-and-shoulders under even lighting so there's nothing asymmetric to flip, and apply the amber/cyan grade as a fixed Phase-3 overlay.)

**look_t1 — slight turn** · *attach P1 ONLY*
```text
Edit this image — keep his body, pose, outfit, proportions, lighting and the background EXACTLY the same. Change ONLY his head/neck angle and eye direction: he turns his head a small amount to one side and his eyes glance the same way. Very subtle, natural, friendly. No text, no extra characters.
```

**look_t2 — medium turn** · *attach P1 ONLY*
```text
Edit this image — keep his body, pose, outfit, proportions, lighting and the background EXACTLY the same. Change ONLY his head/neck angle and eye direction: he turns his head a moderate amount to one side and his eyes follow the same way. Natural, subtle, friendly. No text, no extra characters.
```

**look_t3 — far turn** · *attach P1 ONLY*
```text
Edit this image — keep his body, pose, outfit, proportions, lighting and the background EXACTLY the same. Change ONLY his head/neck angle and eye direction: he turns his head a large amount to one side, as if watching something toward the edge, eyes looking the same way. Natural, friendly. No text, no extra characters.
```

*(If the three come out turned in different directions from each other, just horizontally flip the odd ones so all three face the same way before saving — then the build's mirror handles the opposite side. The 7 positions cross-fade in JS; idle loop C1 plays underneath when the cursor is still.)*

**2.3 Parallax depth layers — 3 standalone images (optional)**

> Soft slabs behind and in front of the character that shift a few px against the pointer for depth. **The trick that makes these composite cleanly:** generate the two *glow* layers on **pure solid black** and blend them in Phase 3 with `mix-blend-mode: screen` — under screen blend, black becomes invisible and only the glow shows, giving you clean "transparency" for free with **no cut-out / no rembg step** (rembg is only for the character mattes in §4). The backmost layer is just an opaque backdrop. Generate each large (~1920×1200, landscape) and low-contrast; they get scaled to cover and never compete with the character or headline.

Stack, back → front:

**bg_base — opaque backdrop (backmost, static or slowest parallax)** · *no attachment* · opaque
```text
A dark cinematic backdrop: deep ink-blue near-black (hex 0B0F1A) filling the whole frame, with a soft diffuse pool of warm amber lamplight glowing from the upper-left and falling off gently into shadow, heavy soft-focus, completely empty — no objects, no people, no text. Atmospheric, low contrast. Wide landscape.
```

**bg_blueprint — cyan grid glow (behind the character; screen-blended)** · *no attachment* · **generate on PURE BLACK**
```text
On a pure solid black background: a faint, thin, softly glowing cyan technical blueprint — a light grid plus a few delicate schematic line-drawings — low density, drifting toward the right side of the frame, abstract and unreadable. Only thin glowing cyan lines on black and nothing else; no solid shapes, no text. Subtle, digital. Wide landscape.
```
> Composite with `mix-blend-mode: screen` → the black drops out, only the cyan glow remains.

**fg_motes — drifting light specks (in front of the character; fastest parallax)** · *no attachment* · **generate on PURE BLACK**
```text
On a pure solid black background: a sparse scattering of small, soft, out-of-focus glowing bokeh specks and fine dust motes in warm amber and pale cyan, varying sizes, mostly across the lower half of the frame, heavy soft-focus. Only glowing specks on black and nothing else; no text, no objects. Dreamy, subtle, cinematic. Wide landscape.
```
> Composite with `mix-blend-mode: screen`, as the front layer with the largest parallax shift.
>
> *Prefer a literal workbench edge over motes for the foreground? Generate a dark, blurred workbench surface with a couple of tool silhouettes filling only the bottom ~20% of the frame, place it as the front layer, and fade its top edge with a CSS mask (`mask-image: linear-gradient(to top, black, transparent)`) so it melts into the dark page. A dark occluder can't use screen blend, so it needs the mask instead.*

**Assembly notes for Phase 3:**
- Static poster (P1, the center/`look_0` position) is the instant-load placeholder; C2/C1 lazy-load and take over once decoded.
- `prefers-reduced-motion`: show P1 only, no wave, no idle, no cursor tracking.
- Mobile: P1 poster + one gentle idle loop, no cursor tracking (no pointer).
- Total hero payload target: poster + look-set + one idle loop ≤ ~600 KB after AVIF.

---

## 3 · CLIP PROMPTS (Seedance / Veo) — each block is complete; attach the listed seed still

> ### Working with the models (READ FIRST — these tools do NOT obey prompts precisely)
> Image-to-video is "best-effort continuation," not controllable animation. Don't fight it; design around it. Five rules that resolve the common failures:
>
> 1. **Scrub clips don't need to loop — so stop asking for loops.** Most clips are scroll-scrubbed: scroll down plays them forward, scroll up plays them backward, so they're seamless *by definition*. The "first and last frame identical" instruction was confusing the model for no benefit — it's been removed from every scrubbed clip. **Only true autoplay loops** (hero idle C1, reading nook C14, blueprint C12, wrench-polish C17) need seamlessness, and those get it in post via **boomerang** (forward+reverse, §4.6) — which is *always* seamless regardless of what the model returns. Never rely on the model to match frames.
> 2. **Seed from the START of the motion (a rest pose), not the climax.** This is why the wave glitched: P2 already has the hand up, so "raise then lower" had nowhere to go. Seed round-trip motions (wave, lift-and-place) from **P1 / a neutral standing pose** and describe the full action forward. Continuation motions (soldering, reading) can seed from their active pose since they don't return.
> 3. **Never say "walks in / enters / appears."** The character is already in the seed image; an entrance instruction makes the model spawn a SECOND character (the duplicate-idle bug). Phrase every action as the *existing* subject continuing: "the man in the image walks toward the right," not "a character walks in."
> 4. **Don't fight duration.** If Veo gives 10s when you asked for 5, let it — you'll **trim to the clean sub-range in ffmpeg** (§4.1) and sample frames from there. Duration non-compliance is a non-issue once the raw clip is just raw material.
> 5. **One motion per clip.** Compound actions ("lifts, places, steps back, nods") are where it melts. Ask for the single most important beat; cut the rest. Shorter, simpler prompts survive far better.
>
> If a clip still fights you after 2–3 tries, it's a candidate to become a **still + GSAP** beat instead of video (see the note at the end of §3) — that's often the right answer, not more re-rolls.

> ### ✅ BUILD SET — generate ONLY these 8 clips (decided 2026-06)
> Scope set to "journey-rich." Generate as video **only** the clips where body motion is the point:
> | Clip | Beat | Seed |
> |---|---|---|
> | **C1** | hero idle (boomerang loop) | P1 |
> | **C2** | hero wave on load | **P1** (rest, not P2) |
> | **C3** | walk through eras | P3 |
> | **C6** | Heddoko — solder, lights ignite | P5 |
> | **C7** | garage → next transition | P6 |
> | **C8** | Brex — threads flow | P8 |
> | **C10** | Ubisoft — org chart assembles | P7 |
> | **C11** | companion birth (the thesis beat) | P9 |
>
> **Every other C-clip below (C4, C5, C9, C12–C20) is NOT generated as video** — those beats become **pose-still + GSAP** (articles, highlights wall, contact card, reading nook, etc.). They're kept in this doc only as reference in case a still beat later wants promoting to video. Don't spend time on them now.

Background classes (already written into each prompt):
- **MATTE** = plain light-grey studio → background removed per-frame afterward (section 4.2), composited over the page.
- **SCENE** = full environment baked in → shown inside a contained 16:9 stage, no matting.

### Tier 1 — must-have

**C1 — hero idle (MATTE · LOOP)** · *attach P1*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: subtle breathing idle — gentle weight shift, the cyan tablet's glow flickers softly, one slow blink, an occasional small head turn. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration ~5 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```

**C2 — hero wave (MATTE)** · *attach **P1** (rest pose, arms down — NOT P2; seeding from the raised hand is what glitched)*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. The man starts with his arms relaxed at his sides as in the image. Action: he raises his right hand and gives one friendly wave. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration ~3 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```
*(In the hero, this plays once on load and cross-fades into the C1 idle — no need for the wave to return to rest itself.)*

**C3 — walk cycle (MATTE · LOOP)** · *attach P3*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: walks left-to-right in exact side profile at a relaxed confident pace, natural arm swing, slight bounce in his step, carrying the glowing cyan tablet. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration ~5 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```

**C5 — card construction (MATTE)** · *attach **P1** (standing — action starts from rest, not the mid-lift of P4)*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. The man stands relaxed as in the image. Action: a glowing translucent panel rises up in front of him and he steadies it with both hands. (One motion only — no crouch, no step-back.) Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration ~4 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```

**C6 — Heddoko garage (SCENE)** · *attach P5*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: a dim garage workshop at night, a single warm tungsten work lamp, a workbench with a sewing machine and hand tools, a dark mannequin torso wearing a smart-fabric garment. Action: he solders a connection on the fabric; tiny amber points of light ignite one by one across the garment on the mannequin; he looks up at it with quiet pride. Camera: locked-off, no camera movement, no zoom. Duration 5 seconds, smooth 24fps motion. No text, no extra characters.
```

**C8 — Brex tower (SCENE)** · *attach P8*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: a sleek dark fintech office at night, floor-to-ceiling windows, thin teal-blue threads of light flowing across a faint world map etched in fine line-work in the air. Action: the man already in the image slides the glowing card-sized hologram he is holding into a floating slot of cyan light; the light-threads across the map brighten and multiply; he watches them flow with calm satisfaction. (He is already present — do NOT add or introduce a second person.) Camera: locked-off, no camera movement, no zoom. Duration 5 seconds, smooth 24fps motion. No text, no extra characters.
```

**C10 — Ubisoft studio (SCENE)** · *attach P7*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: a dark game-studio operations room, a wall of monitors showing abstract heat-maps and rising graphs (no recognizable game imagery), tactical-tape markings on the floor, slate tones with one signal-yellow floor stripe. Action: he reviews the monitor wall, points at one screen, makes a small adjusting gesture; a holographic org chart of glowing cyan nodes assembles in the air beside him, node by node. Camera: locked-off, no camera movement, no zoom. Duration 5 seconds, smooth 24fps motion. No text, no extra characters.
```

**C11 — companion birth (SCENE)** · *attach P9*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: the same dark game-studio room, darker now, monitors glowing softly. Action: the glow from the monitors condenses into a swirl of cyan light that forms into a small floating companion — a fist-sized irregular translucent polyhedron like a cut gemstone with a bright core and two simple friendly curved eyes; it bobs once and settles beside his right shoulder; he turns and smiles at it. Camera: locked-off, no camera movement, no zoom. Duration 5 seconds, smooth 24fps motion. No text, no other characters.
```

**C18 — turn to camera (MATTE)** · *attach T2 (¾ view)*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: from a relaxed three-quarter stance he turns to face the camera squarely, and his expression warms into a genuine smile. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no extra characters.
```

**C19 — business card extend (MATTE)** · *attach P12*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: extends a small blank business card toward the viewer with warmth and confidence, then holds it steady. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no extra characters.
```

### Tier 2 — strongly wanted

**C7 — garage exit transition (SCENE)** · *attach P6*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: the edge of the dim garage workshop, warm lamplight fading toward the right side of the frame. Action: he lifts glowing amber data points from a smart-fabric garment; they drift together and compress between his hands into a single glowing card-sized hologram; he looks at it, then carries it as he walks toward the right edge of the frame. Camera: locked-off, no camera movement, no zoom. Duration 5 seconds, smooth 24fps motion. No text, no extra characters.
```

**C9 — follow the light thread (MATTE)** · *attach P3*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: a thin thread of teal light drifts from left to right ahead of him; he follows it, walking at a curious, confident pace, eyes on the light. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no extra characters.
```

**C13 — journey pin-out (SCENE)** · *attach P9*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: the dark studio, all lights dimming except one warm lamp. Action: he and the small cyan gemstone companion at his shoulder walk toward the camera and pass below the bottom of the frame, the companion bobbing gently as they go. Camera: locked-off, no camera movement, no zoom. Duration 3 seconds, smooth 24fps motion. No text, no other characters.
```

**C14 — reading nook ambient (SCENE · LOOP)** · *attach P10*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: a cozy reading nook — a drafting table, a single warm lamp, dark backdrop. Action: seated, calmly reading a glowing page; turns a page every couple of seconds; one slow blink; ambient and peaceful. Camera: locked-off, no camera movement, no zoom. Duration ~5 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```

**C16 — pin frame to wall (MATTE)** · *attach P11*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: takes a brass-cornered picture frame from under his arm, pins it to an invisible wall at head height, straightens it with two fingers, and gives a satisfied nod. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no extra characters.
```

**C20 — nod sign-off (MATTE)** · *attach P12 (and mention companion)*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely, including the small cyan gemstone companion hovering at his right shoulder. Action: he gives a single warm nod to the camera; the companion bobs once in sync with the nod. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character and companion fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no other characters.
```

### Tier 3 — polish

**C4 — toolbox set-down (MATTE)** · *attach P1*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: the man already in the image opens a worn metal toolbox in front of him; a soft amber glow rises from inside; he looks up, ready to work. (He is already present — do NOT add or introduce a second person.) Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 4 seconds, smooth 24fps motion. No text, no extra characters.
```

**C12 — blueprint collaboration (SCENE · LOOP)** · *attach P9*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Scene: close on a drafting board in warm lamplight, dark backdrop. Action: the small cyan gemstone companion projects thin cyan sketch-lines onto the blueprint just ahead of his pencil; he adjusts one of the lines; they exchange a brief glance. Camera: locked-off, no camera movement, no zoom. Duration ~4 seconds (trim in post if longer), smooth 24fps motion. No text, no other characters.
```

**C15 — slide article card (MATTE)** · *attach P10*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: seated, slides a glowing translucent card across an invisible table surface toward the camera with two fingers, then looks up with a friendly nod. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration 3 seconds, smooth 24fps motion. No text, no extra characters.
```

**C17 — wrench polish idle (MATTE · LOOP)** · *attach P1*
```text
Animate this exact 3D Pixar-style character, preserving his face, glasses, beard, outfit, proportions and rendering style precisely. Action: leans one elbow on an invisible shelf at hip height, polishing the small steel wrench with a cloth, relaxed, occasionally glancing toward the camera. Camera: locked-off, no camera movement, no zoom. Background: plain seamless light-grey studio background, character fully separated from the background, soft contact shadow only. Duration ~4 seconds (trim in post if longer), smooth 24fps motion. No text, no extra characters.
```

### When a clip isn't worth the fight — make it a still + GSAP beat instead

Video is the unreliable, expensive asset; the pose stills are proven and gorgeous. You do **not** need every beat to be video. A still animated by scroll (GSAP/Lenis) is often *more* elegant than a glitchy clip and costs minutes, not hours. Convert a beat to still + motion when the "action" is really just an effect *around* a mostly-still character:

- **The character barely moves** → use the pose still; animate the *environment* (igniting solder lights, flowing cyan threads, the org-chart nodes, blueprint lines) as GSAP/CSS/canvas layers over the still. The blueprint-line motif already does exactly this.
- **A reveal or hand-off** (cards sliding in, frames pinning to the wall, the business card extending) → still + transform/opacity on scroll. No video needed.
- **Entrances/exits** → parallax-translate the still across the frame instead of asking the model to walk him in (which spawns duplicates anyway).

**The decided build set is the 8 clips listed in the ✅ box at the top of §3** (C1, C2, C3, C6, C7, C8, C10, C11). Everything else is still + GSAP. This is also better for the 60fps / Lighthouse / payload gates.

---

## 4 · FFMPEG / MATTING — clip → frame sequences

Directory convention: `assets/seq/<clipId>/<profile>/frame_%03d.avif`

### 4.0 Trim to the clean range first (do this before anything else)
The models over-run duration and often have a glitchy first/last beat. Cut the good sub-range — this also fixes "Veo gave me 10s." Scrub through, note the in/out seconds, then:
```bash
ffmpeg -ss 1.2 -to 5.8 -i C06_raw.mp4 -c:v libx264 -crf 16 C06.mp4   # keep 1.2s–5.8s
```
Use the trimmed `C06.mp4` for every step below. Trimming away a bad entrance/exit beat is usually faster than re-generating.

### 4.1 Extract scrub frames
A 5s/24fps clip has 120 frames; we keep 28 (desktop) / 14 (mobile), evenly sampled:

```bash
# Desktop: 28 frames @ 1440px wide
ffmpeg -i C06.mp4 -vf "fps=28/5,scale=1440:-2" -qscale:v 2 tmp/C06/d/frame_%03d.png

# Mobile: 14 frames @ 720px wide
ffmpeg -i C06.mp4 -vf "fps=14/5,scale=720:-2"  -qscale:v 2 tmp/C06/m/frame_%03d.png
```
(For 3–4s clips replace `28/5` with `28/3`, `28/4` etc. — the numerator is always the frame budget.)

### 4.2 Background removal (MATTE clips only)
```bash
pip install "rembg[cli]" onnxruntime
rembg p -m birefnet-general tmp/C03/d tmp/C03/d_alpha   # per-folder, outputs PNG with alpha
```
QA each sequence at 200%: check for edge halos around hair/glasses and the glowing tablet (glow may be eaten — if so, re-run with `-m isnet-general-use` and compare).

### 4.3 Encode AVIF (+ WebP fallback)
```bash
# AVIF (primary)
for f in tmp/C06/d/*.png; do
  avifenc --min 22 --max 34 --speed 6 "$f" "assets/seq/C06/d/$(basename "${f%.png}").avif"
done
# WebP (Safari < 16 fallback)
for f in tmp/C06/d/*.png; do
  cwebp -q 78 -alpha_q 90 "$f" -o "assets/seq/C06/d/$(basename "${f%.png}").webp"
done
```

### 4.4 Budget check
```bash
du -sh assets/seq/*/d | sort -h
# target: ≤ 2.5 MB per desktop sequence, ≤ 0.9 MB per mobile sequence
```
If a SCENE sequence overshoots: raise `--min/--max` by 4 and re-check banding on the dark areas (grain in frame hides most of it).

### 4.5 Scrubbed clips — no loop needed
Scroll-scrubbed clips (the journey beats, walk, card actions, contact) are seamless by construction: scroll down = forward, scroll up = reverse. Do nothing special — just extract frames (4.1) and the scrubber handles both directions.

### 4.6 Boomerang for the 4 autoplay loops (C1, C14, C12, C17)
Only the clips that play on their own need a seamless loop. Don't ask the model for it — make it with forward+reverse, which is *always* seamless:
```bash
# Video boomerang (forward then reverse), then feed THIS into 4.1
ffmpeg -i C01.mp4 -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]" -map "[v]" C01_boom.mp4
```
Or, equivalently, in the build: play the extracted frame sequence 0→N then N→0. Trim each loop clip (4.0) to a stretch with no big head-position jump first, so the turnaround at the ends is gentle.

---

## 5 · ASSET REVIEW CHECKLIST (gate before Phase 3)

- [ ] T1 likeness approved at thumbnail size AND at 2× zoom
- [ ] All 12 poses share the same build (proportions, belt contents, sneaker color)
- [ ] Era variants (P5–P8) recognizable as the same man
- [ ] Companion reads as tool-like, not cute
- [ ] Hero look-frames (§2.2): head turns read smoothly L→R, identical body in all 7
- [ ] Tier-1 clips: no morphing faces, no melted hands, loops verified
- [ ] Matted sequences clean over #0B0F1A
- [ ] OG image legible at 600px wide
