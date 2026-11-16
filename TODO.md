# cormacmadden.com — to-do

Running list of things to fill in or fix. Tick items off as they're done (`[x]`).
Placeholders in the site are marked `TODO` in the source; this list is the overview.

## Content from Cormac

- [ ] **About page** — review the draft in `src/pages/about.astro` (story, photography, outside work, contact). Check the Kuda Media "as a teenager" line and the photography subjects
- [ ] **Lens intros** — expand the three intros in `src/data/lenses.ts`
- [ ] **JLR digital twin** — role, problem, outcome, full write-up, architecture diagram; representative renders
- [ ] **JLR digital twin** — link the NVIDIA GTC 2025 session and the June 2025 LinkedIn post
- [ ] **JLR digital twin** — replace the temporary hero (DigitalTwinWebApp screenshot) with a generic, de-branded render: no JLR logo, plant names, model names or KPI figures
- [ ] **JLR driving simulator** — images: the simulator shots show the unreleased JEA buck, so don't use them unless JLR gives written permission. Use a diagram, CarMaker scenes or a representative render instead
- [ ] **JLR driving simulator** — summary, stack, role, problem, outcome, write-up, diagram
- [ ] **Head-tracked LED wall** — role, problem, outcome, context, architecture, what I built, hard problem, result
- [ ] **Kinect UE5 plugin** — check role wording, hard problem, result; keep star count current
- [ ] **HoloLens games** — role and what I built myself
- [ ] **Cloth sim generator** — say what the dataset was for (role set to solo final-year project, dates 2021–22)
- [ ] **Car speed from video** — method (segmentation, plate detection, size → distance) and accuracy
- [ ] **Plane animation** — techniques used; repo link
- [ ] **Boids simulation** — rules, agent count, obstacle avoidance; confirm stack; repo link
- [ ] **life_os** — start month; one hard problem and what's next

## New content to create

- [ ] **Bali Biker (Unreal Engine game)** — make it presentable: gameplay capture, short clip for the hero, project page
- [ ] **More 3D models** — export .glb versions of the piano, chair variants etc., optimise them (see README) and add to `src/data/models.ts`
- [ ] **Shed studio lighting** — optional: bake ambient occlusion in Blender for soft contact shadows in corners (the real-time sun handles cast shadows)
- [ ] **Shed studio model** — write a proper description; fix the see-through walls so the window frames on cut-away walls hide too (Cormac working on this); try 2048px textures if 1024 looks soft
- [ ] **Shed studio** — write its description in `src/data/artstation.json` (it has no ArtStation post)
- [ ] **Icons for Substance 3D Painter, Photoshop, InDesign, SolidWorks and MATLAB** — Simple Icons dropped these brands, so they show as text for now; the Adobe ones exist in your Icons folder if you want to add them
- [ ] **Instagram feed** — show recent posts on /about (needs the Instagram Graph API with a professional account, or hand-picked post embeds). Link and icon are done.
- [ ] **Run `npm run sync:artstation`** on your machine to refresh the data (my sandbox can't reach artstation.com), and add the `--check` step to CI
- [ ] **Self-host the ArtStation images** instead of hotlinking their CDN
- [ ] **GitHub sync tool** — script that pulls repo metadata (stars, description, last update) for projects with a `repo` link, flags new repos without a project page, and keeps star counts current

## Video

- [ ] **Blurbs** for the videos in `src/data/vimeo.json` — only Hamilton Gardens and BVR have one
- [ ] **Check the grouping**: the four UE4 Virtual Tours, Ard Nua, One Ballsbridge, Kilternan Gallops and the BUWOG tour were sorted by guesswork into `walkthrough` / `tool` / `film`. `feature: true` puts a video first in its group
- [ ] **Say who each one was for** (Beyonity, 3D Design Bureau, Kuda Media) — the upload dates aren't the work dates
- [ ] **Link the walk-throughs from the case studies** that they belong to

## Logos and links

- [ ] Logo for **Kuda Media** (media page, clients section)
- [ ] **VSCO** profile URL in `src/data/site.ts` (icon is ready). Vimeo is done
- [ ] Beyonity wordmark is tiny in the square logo slot — widen the slot or use a square mark

## Design ideas (not done yet)

- [ ] Featured work as one large case study + two smaller, rather than three equal cards
- [ ] **Car configurator on the home page** (later, once there's a good enough model) — an interactive car in the hero: orbit, paint colour, wheels, maybe lights / doors. Needs a clean, optimised car .glb with paint and wheels as separate materials/meshes; keep the current photo as the poster / fallback

## Decisions

- [ ] **life_os README on GitHub** shows the unblurred screenshot (calendar, bank balance, emails, home location). Consider swapping it for the blurred one in `src/assets/projects/life-os/dashboard.jpg`.

## Site / infra

- [ ] Public ingress (reverse proxy with TLS or Cloudflare Tunnel) — `how-this-site-is-built`
- [ ] Architecture diagram for `how-this-site-is-built`
- [ ] Point cormacmadden.com at the server
- [ ] Delete the `.review/` and `_to_delete/` folders, and the empty `public/vendor/` folder (preview images and test builds; git-ignored)

## Done

- [x] Concept audio workstation model added to its artwork page (2.9 MB → 687 KB)
- [x] Mobile pass: fixed the Experience/Education list overflowing on phones (page was zooming out), 44px tap targets in header and footer, tighter hero, shorter focus cards, 2-up media and 3D grids, sideways-scrolling tag filters on /work, readable active filter and badges in dark mode

- [x] Digital twins page: "My work at JLR" section (confidentiality note + NDA-safe summary of the work catalog) — review wording

- [x] Media & 3D posts can appear on focus pages (`media/<slug>` in `src/data/lenses.ts`); Hamilton Gardens and Berlin Penthouse added to Real-time 3D & XR

- [x] Experience text finalised (JLR detail approved, ski rep entry finished); `tbc` flags removed
- [x] Contact email (comadden@gmail.com) on the home page and About page
- [x] MSc dates fixed to 09/2022 – 09/2023; Algorithm dates kept at 12/2022 – 09/2023; MSc module projects dated 2022–23, LED wall 12/2022 – 09/2023, cloth sim 2021–22
- [x] About page drafted (for review)
- [x] No accent colour — staying near-black / off-white
- [x] Subtle scroll fade-in on headings, cards and timeline rows (only below the fold, off for reduced motion)
- [x] Home hero swapped to the aluminium body-in-light-tunnel press photo (JLRManufacturingCB09011506), shown at 16:9 taking 0.6 of the hero width; Nitra photo stays on the Digital twins card only
- [x] JLR press photos approved for the portfolio (credited "Photo: JLR"); `halewoodbiw013.jpg` still unused (PR-only)
- [x] FFmpeg project keeps its *Titanic* stills
- [x] life_os listed on the Digital twins and Tools & pipeline lenses

- [x] Tool tags show the logo where one exists (C++, Python, React, three.js, Docker, PyTorch, Blender…) and the name where it doesn't (C#, OpenUSD, XR…)

- [x] Page width widened (68rem → 78rem → 90rem)
- [x] Experience and Education entries expand to a fuller write-up on click

- [x] Hero rebuilt Unity/Unreal style: name left, greyed factory image right, portrait floating over the seam
- [x] Space Grotesk for headings, self-hosted in public/fonts (no Google Fonts requests)

- [x] Dark mode is neutral grey, no blue tint; buttons and links follow the text colour
- [x] Header brand text replaced with a home icon
- [x] Full-bleed hero photo with the intro over a darkened gradient
- [x] Explore-by-focus cards are image + title only

- [x] CV page removed (no CVs on the site); JLR and TUI logos added to Experience

- [x] Super Soco motorbike model on its artwork page (48 MB → 3.2 MB); fixed the viewer clipping large models out of view

- [x] Artwork images shown as a flexible grid (wide and tall shots claim more space; click opens full size)

- [x] Every ArtStation post has its own page (images, video, text, software, link back to ArtStation)
- [x] 3D artwork section on the home page linking to Media & 3D
- [x] ArtStation sync script (`npm run sync:artstation`)

- [x] 3D models moved onto their own project pages (bike, chair, shed) instead of cluttering the Media page
- [x] Concept chair model added (122 MB → 4.8 MB)

- [x] 3D viewer background and outline removed — models sit straight on the page (transparent posters too)
- [x] Bike model added (26 MB → 5.0 MB, 2048px textures)

- [x] 3D viewer switched to three.js with a shadow-casting sun (walls/roof don't block it), soft room fill and a ground shadow; poster re-rendered

- [x] 3D model now loads automatically when scrolled into view (no load button)

- [x] Interactive 3D model viewer on /work/media (click to load, drag to spin) — shed studio optimised 108 MB → 5.9 MB

- [x] Explore by focus moved above Featured work, with an image per lens
- [x] Timeline logos bigger, no tile background or border
- [x] Removed GFB from experience

- [x] Fixed hover preview showing the clip below the still image

- [x] LED wall: floating-spheres clip is now the main visual
- [x] Project cards play their clip on hover / keyboard focus (poster otherwise; respects reduced motion)

- [x] Instagram link in footer, About page (Photography) and Media page
- [x] Experience and Education split into separate lists; logos left, dates right
- [x] JLR factory photos added to the digital twin gallery (credited)

- [x] Tool icons on skill / stack chips
- [x] Company and university logos on the timeline
- [x] Social icons in the footer
- [x] BUWOG client logo on the media page
- [x] Dark-mode versions of all dark logos and icons
- [x] LED wall footage as hero and gallery clips
- [x] Plane animation, boids and Airbnb project pages
- [x] Car speed from video page (linked to repo)
- [x] Fire rendering settings-panel screenshot
- [x] Tag filter bug on /work (tags with spaces)
- [x] Wide / tall hero videos no longer cropped
- [x] Single-year projects no longer show "– present"
- [x] life_os project page (screenshot with personal details blurred)
- [x] Video compression / bitrate project page
