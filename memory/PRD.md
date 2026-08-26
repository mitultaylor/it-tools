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
- v2 rebuild (latest): agency-portfolio-grade design on a deep obsidian base (#07070A, no pure black) with film-grain texture, Bricolage Grotesque + Manrope typography, left-aligned cinematic hero with scroll indicator.
- Glassmorphism on the 6 tool cards only (backdrop-blur, hairline borders, inner highlight); each card has its own jewel accent (amber, jade, crimson, amethyst, azure, chartreuse) driving its glow, icon chip, kicker, and CTA pill — distinct but one system.
- Cards show $29 one-time pricing; tools listed in user's order (Change Readiness, Salary Benchmarker, Incident Priority, Job Tracker, ServiceNow Health, CMDB Audit).
- v1 (superseded): monochrome black/white theme — replaced at user's request.
- Fixed Gumroad checkout: replaced broken iframe modal with official gumroad.js overlay; verified Get tool → overlay → Add to cart → gumroad.com/checkout (US$29, card/Klarna/Cash App).
- Integrated all 6 real Gumroad URLs (3 recovered from user's original uploaded HTML, 3 new).
- Lenis smooth momentum scrolling + framer-motion staggered card reveals.

## Backlog
- P0: none.
- P1: Claude AI integration (user requested; use case never clarified — ask before building).
- P1: Prices shown on cards come only from Gumroad overlay; if user wants visible prices on cards, confirm the 3 new tools' prices.
- P2: Launch analytics (which tool gets clicked most), mobile nav hamburger refinement.

## Next Tasks
1. Ask user about Claude AI use case, then integrate via Emergent LLM key.
2. Optional: per-tool preview images/thumbnails.
