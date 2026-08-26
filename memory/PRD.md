# PRD — IT Tool Land Landing Page

## Original Problem Statement
Single premium "IT TOOL LANDING PAGE" integrating 6 Gumroad tools (3 existing + 3 new), with an all-new color combination (user rejected the mint/peach/ink-green palette), optional glass effect, smooth scrolling, all content on one page, and a "$10,000 premium website" feel. No filler sections (method/about/multiple explore buttons were explicitly rejected). Working Gumroad checkout (previous iframe modal broke Add to cart).

## Architecture
- Frontend-only React SPA (FastAPI backend + MongoDB exist in template but are intentionally unused — Gumroad hosts checkout, no keys needed).
- `/app/frontend/src/App.js` — page + 6 tool data.
- `/app/frontend/src/App.css` — design system (pure black/white/zinc, Outfit + Inter).
- `/app/frontend/public/index.html` — loads `https://gumroad.com/js/gumroad.js` once.
- Gumroad checkout: official overlay script auto-enhances the 6 product anchors; plain href is the fallback if the script is blocked.
- Smooth scrolling: Lenis (`lenis` npm) + anchor scrolling with nav offset.

## User Personas
- IT leaders/operators buying $29 one-time browser tools (CMDB audit, ITSM health, incident priority, change readiness).
- IT professionals job-hunting or benchmarking salary (leadership tracker, salary benchmarker).

## Core Requirements (static)
1. One premium single page: nav, hero, 6-tool grid, minimal footer.
2. All-new color palette (done: monochrome black/white/zinc, glass only on sticky nav).
3. Six Gumroad products wired to real checkout.
4. Smooth scrolling, compact layout, no placeholder sections.

## The 6 Tools (all Gumroad, $29 one-time, seller "Meet Ulista" / Mitul Tailor)
1. CMDB Health Audit — gumroad.com/l/cmdb-audit-tool
2. ServiceNow ITSM Health — gumroad.com/l/servicenow-itsm-health
3. IT Leadership Tracker — gumroad.com/l/it-leadership-job-tracker
4. IT Incident Priority Calculator — gumroad.com/l/it-incident-priority-calculator
5. IT Leadership Salary Benchmarker — gumroad.com/l/it-leadership-salary-benchmarker
6. IT Change Readiness Checker — gumroad.com/l/it-change-readiness-checker

## Implemented (2026-08-26)
- v4 rebuild (latest): interactive duotone — navy #0A0F2C + electric cyan #00F5FF. Canvas particle mesh (drifting nodes + connective lines, mouse-repulsion) behind hero, staggered fade-in hero copy with scroll parallax (hero drifts/fades on scroll), floating orbs + floating trust badges, 3D tilt tool cards (pointer-tracked rotateX/rotateY via CSS vars + cursor-following cyan shine), cyan glow hovers on cards and buttons, parallax on toolkit heading. Lenis smooth scroll retained.
- v3 (superseded): static duotone navy/cyan.
- Nav has exactly ONE button ("View Toolkit"). Cards show $29 one-time; buy buttons are plain anchors opening the Gumroad product in a NEW TAB (target="_blank") — no overlay script, no custom cart. gumroad.js removed from index.html.
- Verified: 6 cards with correct links, 1 nav button, click opened gumroad.com/l/cmdb-audit-tool in a new tab.
- v2 (superseded): obsidian monochrome + 6 jewel accents with gumroad.js overlay.
- v1 (superseded): monochrome black/white theme.
- Lenis smooth momentum scrolling + framer-motion staggered card reveals.

## Backlog
- P0: none.
- P1: Claude AI integration (user requested; use case never clarified — ask before building).
- P1: Prices shown on cards come only from Gumroad overlay; if user wants visible prices on cards, confirm the 3 new tools' prices.
- P2: Launch analytics (which tool gets clicked most), mobile nav hamburger refinement.

## Next Tasks
1. Ask user about Claude AI use case, then integrate via Emergent LLM key.
2. Optional: per-tool preview images/thumbnails.
