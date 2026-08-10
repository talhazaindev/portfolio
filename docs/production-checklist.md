# Production checklist — talhazain.com

Use this after the GitHub → Vercel → Spaceship cutover.

## Deployment pipeline

- [ ] GitHub repository pushed — https://github.com/talhazaindev/portfolio
- [ ] Vercel Git integration connected to `talhazaindev/portfolio`
- [ ] Production deployment successful on `main`
- [ ] Preview deployments work for non-`main` branches

## Domain & DNS (Spaceship → Vercel)

- [ ] `talhazain.com` added in Vercel
- [ ] `www.talhazain.com` added in Vercel
- [ ] Apex set as primary production domain
- [ ] `www` configured to redirect to `https://talhazain.com`
- [ ] DNS records configured in Spaceship using **exact** values from Vercel
- [ ] Conflicting parking / URL-forwarding records for `@` / `www` removed (keep MX/SPF/DKIM/DMARC)
- [ ] HTTPS active (Vercel-managed certificate)
- [ ] `https://www.talhazain.com` redirects to `https://talhazain.com`

### Spaceship DNS path

```text
Spaceship
→ Domain List
→ talhazain.com
→ DNS
→ Manage DNS Records
```

Fill each record from the Vercel Domains panel (do not invent IPs or CNAMEs):

```text
Type:
Host:
Value:
TTL:
```

Typical Vercel pattern (confirm in dashboard before applying):

| Purpose | Usual type | Host |
|---------|------------|------|
| Apex | A (or ALIAS/ANAME if shown) | `@` |
| WWW | CNAME | `www` |
| Verification | TXT | as shown by Vercel |

## Environment

- [ ] `NEXT_PUBLIC_SITE_URL=https://talhazain.com` set for Production
- [ ] Same variable set for Preview (recommended)

## SEO

- [ ] `https://talhazain.com/robots.txt` valid
- [ ] `https://talhazain.com/sitemap.xml` valid
- [ ] Canonical metadata uses `https://talhazain.com`
- [ ] OpenGraph title/description/image correct
- [ ] No metadata references to `localhost`, `vercel.app`, or `example.com`
- [ ] Person + WebSite JSON-LD present

## Content & links

- [ ] Résumé accessible: `/Talha_Zain_Applied_AI_Engineer_CV.pdf`
- [ ] GitHub links working
- [ ] LinkedIn working
- [ ] Live project links working (AI Compare Hub, MediaX)
- [ ] MedicAI / ECG GitHub links working
- [ ] Logo + favicon correct

## Route QA

- [ ] `/`
- [ ] `/work`
- [ ] `/work/ai-compare-hub`
- [ ] `/work/medicai`
- [ ] `/work/mediax`
- [ ] `/work/ecg-intelligence`
- [ ] `/experience`
- [ ] `/about`
- [ ] `/contact`
- [ ] Navigation + mobile navigation
- [ ] Command palette
- [ ] Motion + reduced motion
- [ ] Project filters
- [ ] No horizontal overflow

## Performance

- [ ] Lighthouse run (mobile + desktop)
- [ ] Targets (aspirational): LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms

## Google Search Console

Do not block go-live on this.

1. Add property for `talhazain.com` (prefer **Domain** property).
2. Verify via DNS TXT record in Spaceship (use Google’s exact token — do not invent).
3. Submit sitemap: `https://talhazain.com/sitemap.xml`

- [ ] Google Search Console configured
- [ ] Sitemap submitted

## Ongoing deploy workflow

```text
feature branch (optional)
  → push → Vercel Preview → QA
  → merge to main
  → Vercel Production → https://talhazain.com
```

After Git integration is live, prefer `git push origin main` over `vercel --prod`.
