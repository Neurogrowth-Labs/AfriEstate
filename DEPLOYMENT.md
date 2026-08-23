# AfriEstate Deployment Guide

## Overview

AfriEstate is a Vite React single-page application. The production build emits static assets to `dist/`, which can be deployed to most static hosting providers.

## Production Build

Install dependencies:

```bash
npm install
```

Build the app:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## Build Output

Vite emits production assets to:

```text
dist/
```

Deploy the contents of `dist/` to your static hosting provider.

## Required Environment Variables

Configure these variables in your deployment provider before building:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Optional:

```env
VITE_APP_NAME=AfriEstate
VITE_APP_ENV=production
VITE_APP_URL=https://your-production-domain.com
```

See `ENVIRONMENT.md` for full guidance.

## Static Hosting Configuration

Because this is a single-page app, configure a fallback so direct visits to client-side routes resolve to `index.html`.

Even though the current app uses internal page state rather than route paths, this fallback is still a safe default for future routing support.

### Netlify

Create `public/_redirects` or configure redirects in Netlify:

```text
/* /index.html 200
```

### Vercel

Vercel usually handles Vite SPAs automatically. If custom rewrites are needed, add a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Cloudflare Pages

Use the Vite build command and `dist` output directory. Configure SPA fallback if route-based navigation is added later.

## Supabase Production Checklist

Before production deployment:

- [ ] Move Supabase configuration to environment variables.
- [ ] Enable Row Level Security on all tables.
- [ ] Define policies for users, agents, investors, and admins.
- [ ] Confirm only anon keys are exposed to the frontend.
- [ ] Never expose service-role keys in client code.
- [ ] Validate database schema against `SUPABASE_SCHEMA.md`.
- [ ] Seed required baseline data.
- [ ] Test realtime admin broadcasts if used in production.

## AI Production Checklist

- [ ] Configure Gemini API key securely.
- [ ] Decide whether frontend AI calls are acceptable for your threat model.
- [ ] Consider a backend proxy to protect AI keys and rate limit requests.
- [ ] Add graceful handling for AI quota, timeout, and network errors.
- [ ] Monitor AI usage and cost.

## Security Checklist

- [ ] No `.env.local` committed.
- [ ] No service credentials in frontend code.
- [ ] Supabase RLS policies tested.
- [ ] User-generated content reviewed for safe rendering.
- [ ] Raw HTML rendering reviewed if content can be user-controlled.
- [ ] Authentication and role boundaries manually verified.
- [ ] Browser console checked for sensitive logging.

## Performance Checklist

- [ ] Run a production build.
- [ ] Inspect bundle size output from Vite.
- [ ] Optimize large images where possible.
- [ ] Lazy-load heavy modals or dashboard sections if startup performance becomes slow.
- [ ] Avoid loading all dashboard code upfront if routes are introduced later.

## Deployment Steps

1. Confirm local build succeeds.
2. Configure environment variables in the hosting provider.
3. Connect the repository to the hosting provider.
4. Set build command:

   ```bash
   npm run build
   ```

5. Set output directory:

   ```text
   dist
   ```

6. Deploy.
7. Open the production URL and verify core user journeys.

## Post-Deployment Smoke Test

After deployment, verify:

- Home page loads.
- Property cards render.
- Search filters work.
- Property details modal opens.
- Currency selection persists.
- Language selection works or falls back gracefully.
- Login/signup modal opens.
- Supabase-backed data loads or expected demo fallback appears.
- AI features work or show graceful fallback.
- Dashboard entry points open for appropriate user roles.

## Rollback Strategy

Use your hosting provider's deployment history to roll back to the previous successful build if production issues occur.

Recommended incident steps:

1. Roll back the deployment.
2. Preserve logs and error reports.
3. Reproduce the issue locally.
4. Patch and validate with `npm run build`.
5. Redeploy after review.
