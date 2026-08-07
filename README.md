<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/431f6619-2bb6-47f8-88cb-c451b67768ba

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `GEMINI_API_KEY`.
3. Run the app:
   `npm run dev`

## Production hardening

Apply `supabase_production_hardening.sql` to remove the legacy plaintext password surface, align table columns with the frontend data layer, add investor deal/commitment foundations, and replace prototype public policies with role-aware RLS. Keep `VITE_DEMO_MODE=false` in production so failed backend writes surface as errors instead of demo fallbacks.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm test`
