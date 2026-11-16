# cormacmadden.com — to-do

Running list of things to fill in or fix. Tick items off as they're done (`[x]`).
Placeholders in the site are marked `TODO` in the source; this list is the overview.

## Check before a recruiter reads it

Claude filled every TODO in the case studies on 2026-11-16, working from the CV, the JLR work
catalog, the LinkedIn PDF and the repo READMEs. Anything it could not source is listed under
"Still unanswered" below. These are the lines that came from inference rather than a document —
they read as fact on the site, so give them a once-over:

- [ ] **JLR digital twin** — architecture section describes the flow as Process Simulate / 3DExperience → Omniverse + USD → Unity → React, with MES and FACMON layered on. Check that's the real shape of it
- [ ] **JLR digital twin** — the hard problem is written as CAD being too heavy to render in real time, solved by splitting into process cells, automating optimisation and benchmarking zones. That's assembled from the work catalog, not something you said
- [ ] **JLR digital twin** — outcome reads "working twins of Halewood and Solihull; the team's work was presented at NVIDIA GTC 2025". No numbers, because there are none yet. A figure here would be the single biggest improvement to the page
- [ ] **JLR driving simulator** — the hard problem is written as keeping CarMaker and the Android HMI app in step through Simulink. Plausible from the catalog, but confirm it was the actual difficulty
- [ ] **JLR driving simulator** — dates show as 09/2024 onwards because the placement sat inside the JLR role. Give me the real window if you want it shown separately
- [ ] **JLR driving simulator** — "what I'd do next" suggests adding eye tracking for glance time. That's Claude's suggestion, not your plan
- [ ] **Head-tracked LED wall** — the hard problem is written as matching the virtual screen to the physical one and smoothing Kinect jitter without adding lag. Check that matches what actually fought you
- [ ] **Head-tracked LED wall** — role reads "MSc dissertation, carried into my internship at Algorithm Productions"
- [ ] **Kinect UE5 plugin** — context now says you built it for the LED wall work and the original wouldn't build on UE5. Hard problem is written as the native DLLs not resolving under UE5
- [ ] **HoloLens games** — "developer on a six-person team", and a line about the shared MRTK gaze and hand-tracking layer. Replace with what you actually built; this is the weakest guess on the site
- [ ] **Boids / plane animation / car speed** — written from the videos and the module they were for. The car-speed page now claims focal length is used to map plate width to distance; correct it if the method differed. No agent count is claimed for the boids
- [ ] **life_os** — start month set to 2025-11 from the repo's creation date. The hard problem is the lazy-loading work, since that was already documented

## Still unanswered — Claude needs these from you

- [ ] **HoloLens** — which parts were yours? (chess AI integration, Jenga physics, Tower of Hanoi, menus, the MRTK interaction layer?)
- [ ] **Car speed from video** — how accurate were the estimates? A number would finish the page
- [ ] **Boids** — how many agents ran in real time, and did they avoid the icebergs or pass through them?
- [ ] **JLR metrics** — anything quantified before 30 Nov: hours saved, zones covered, parts optimised, people using it
- [ ] **VSCO URL** — `src/data/site.ts`, the icon is ready and waiting
- [ ] **Ard Nua, One Ballsbridge and Kilternan Gallops** — who were they for (Kuda Media, 3D Design Bureau, something else), and what year? They're the three videos with no blurb
- [ ] **NVIDIA GTC 2025 session + June 2025 LinkedIn post** — paste the URLs and they go back on the digital twin page. Claude searched and couldn't find the session publicly

## Content from Cormac

- [ ] **About page** — review the draft in `src/pages/about.astro` (story, photography, outside work, contact). Check the Kuda Media "as a teenager" line and the photography subjects
- [ ] **JLR digital twin** — representative renders to replace or supplement the JLR press photos
- [ ] **JLR driving simulator** — images: the simulator shots show the unreleased JEA buck, so don't use them unless JLR gives written permission. Use a diagram, CarMaker scenes or a representative render instead. The page has no images at all at the moment
- [x] **JLR digital twin** — hero is now a 40 s clip of the twin replaying a production hour (cleared verbally by Cormac's manager, Nov 2026). It shows line IDs, station numbers and MES/andon states but no company name, plant name or date. The full 73 s version, and the "Quality Tower" cut with JLR/Solihull title cards, stay private — don't publish those
- [x] **Lens intros** — written for all three
- [x] **Kinect UE5 plugin** — star count checked against the API (34)

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

- [x] **Blurbs** written for 9 of 12. Still blank: Ard Nua, One Ballsbridge, Kilternan Gallops (see below)
- [ ] **Check the grouping**: Ard Nua, One Ballsbridge, Kilternan Gallops and the BUWOG tour were sorted by guesswork into `film`. `feature: true` puts a video first in its group
- [ ] **Check the attributions Claude inferred.** The four UE4 Virtual Tours and the Apartment Navigator demo are credited to Beyonity and dated 2019 rather than their 2023 upload date (memory says your Vimeo hosts the Beyonity walk-throughs, and the developments are Berlin ones). BVR is Beyonity by name. BUWOG is credited to Kuda Media, from the clients line on the media page. A `year` field in `vimeo.json` overrides the upload year — none of the others have one
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

- [x] Public ingress — the existing `minipc-docker` Cloudflare tunnel now routes cormacmadden.com and www to `http://192.168.1.214:8088`. `www` used to point at the dev server on the desktop
- [x] Architecture diagram for `how-this-site-is-built`
- [x] cormacmadden.com points at the server and is live
- [ ] **Register a self-hosted runner for this repo** — runners are per-repo, so the one serving DigitalTwinWebApp and life-os won't pick this up. Until then deploys are `git pull && docker compose up -d --build` on the LXC, and the "a push to main starts a runner" line on `how-this-site-is-built` is aspirational
- [ ] Turn on Cloudflare "Always Use HTTPS" (SSL/TLS → Edge Certificates) — http:// currently serves rather than redirecting
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
