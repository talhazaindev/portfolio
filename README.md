# Talha Zain Portfolio

Personal portfolio for **Talha Zain** — Applied AI Engineer.

**Production:** https://talhazain.com  
**Repository:** https://github.com/talhazaindev/portfolio  
**Alias:** https://www.talhazain.com → redirects to apex

---

## Overview

Brand site showcasing production AI systems across agentic AI, LLM systems, RAG, multimodal generation, semantic search, and clinical data platforms.

**Positioning hierarchy:** Agentic AI → LLM Systems → RAG → Production AI Engineering.

| Route | Purpose |
|-------|---------|
| `/` | Brand home |
| `/work` | Featured Systems + Engineering Archive |
| `/work/[slug]` | Flagship case studies |
| `/experience` | Engineering trajectory |
| `/about` | Positioning, education, certifications, résumé |
| `/contact` | Collaboration / contact |

---

## Stack

- **Next.js** 16 (App Router) + **React** 19 + **TypeScript**
- **Tailwind CSS** v4 (tokenized Intelligent Systems theme)
- **Motion** (`motion/react`) — functional / interface / cinematic tiers
- **Lucide** icons
- **Vercel Analytics** (`@vercel/analytics`)

Package manager: **npm** (`package-lock.json`)

---

## Architecture

```text
src/
  app/           # App Router pages, metadata, sitemap, robots, OG images
  components/    # UI, navigation, hero, projects, motion, analytics
  data/          # Content source of truth (projects, experience, social, site)
  lib/           # SEO helpers, analytics, motion utilities
  types/         # Shared TypeScript content types
public/          # Static assets (logo, favicons, résumé PDF)
```

Canonical production URL is driven by `NEXT_PUBLIC_SITE_URL` (fallback: `https://talhazain.com`).

SEO surfaces:

- `metadataBase` / canonicals via `src/lib/seo.ts`
- `src/app/sitemap.ts` → `/sitemap.xml`
- `src/app/robots.ts` → `/robots.txt`
- OpenGraph + Twitter images (`opengraph-image.tsx`, `twitter-image.tsx`)
- Person + WebSite JSON-LD in root layout

---

## Local Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

See [`.env.example`](.env.example). Only public configuration is required:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical site URL — `https://talhazain.com` |

Do **not** commit `.env`, `.env.local`, or any file with real secrets.

Vercel Analytics does not require a custom API key when the project is hosted on Vercel.

---

## Project Structure

Content lives in data modules (edit these, not page shells):

- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/capabilities.ts`
- `src/data/social.ts`
- `src/data/site.ts`

Types: `src/types/content.ts`

Résumé: `public/Talha_Zain_Applied_AI_Engineer_CV.pdf`

---

## Production Deployment

Preferred workflow (GitHub → Vercel CI/CD):

```text
Cursor
  → git add .
  → git commit
  → git push origin main
  → GitHub (talhazaindev/portfolio)
  → Vercel automatic production build
  → https://talhazain.com
```

You should **not** normally need `vercel --prod` after Git integration is connected.

### Vercel project settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build command | `next build` (default) |
| Install command | `npm install` (default) |
| Production branch | `main` |
| Env | `NEXT_PUBLIC_SITE_URL=https://talhazain.com` (Production + Preview) |

---

## Domain

| Role | Host |
|------|------|
| Primary (canonical) | `https://talhazain.com` |
| Alias | `https://www.talhazain.com` → redirect to apex |

Registrar: **Spaceship**  
Hosting: **Vercel**

Add both domains in Vercel, set apex as primary, and configure DNS using the **exact** records Vercel displays (see `docs/production-checklist.md`).

Do not purchase a separate SSL certificate — Vercel provisions HTTPS automatically.

---

## Vercel

1. Import `talhazaindev/portfolio` from GitHub in the Vercel dashboard (preferred over one-off CLI deploys).
2. Confirm framework preset Next.js.
3. Set `NEXT_PUBLIC_SITE_URL`.
4. Deploy from `main`.
5. Attach `talhazain.com` and `www.talhazain.com`.
6. Redirect `www` → apex.

Preview deployments: push any non-`main` branch → Vercel Preview URL → QA → merge to `main`.

---

## Adding Projects

1. Append a `Project` object in `src/data/projects.ts`.
2. Set `featured` / `caseStudy` as needed.
3. For flagships, fill `architecture`, `anatomyLayers`, `engineeringDecisions`.
4. Add screenshots under `public/` and reference them in `media[]` if needed.
5. Use `liveUrl` / `github` only when URLs are confirmed — otherwise `null`.

```ts
featured: true   // homepage + Featured Systems
caseStudy: true  // generates /work/[slug]
```

---

## Updating Content

| Change | File |
|--------|------|
| Site title / URL / tagline | `src/data/site.ts` |
| Email / LinkedIn / GitHub / résumé path | `src/data/social.ts` |
| Projects | `src/data/projects.ts` |
| Experience | `src/data/experience.ts` |
| Capabilities | `src/data/capabilities.ts` |
| Résumé PDF | replace `public/Talha_Zain_Applied_AI_Engineer_CV.pdf` |

After content updates: commit → push `main` → Vercel redeploys automatically.

---

## Confirmed external links

- GitHub: https://github.com/talhazaindev
- LinkedIn: https://www.linkedin.com/in/talhazain10/
- AI Compare Hub: https://ai-compare-hub.com/
- MediaX: https://map.mediaxnetwork.com/
- MedicAI: https://github.com/talhazaindev/MedicAI
- ECG Intelligence: https://github.com/talhazaindev/ECG-Data-Unification

---

## Post-deployment

See [`docs/production-checklist.md`](docs/production-checklist.md) for DNS, HTTPS, SEO, Search Console, and QA checklists.
