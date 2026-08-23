# AfriEstate Environment Configuration

## Overview

AfriEstate is a Vite frontend application. In Vite, environment variables that must be available in browser code should be prefixed with `VITE_` and accessed through `import.meta.env`.

The current codebase includes a hardcoded Supabase client configuration and references AI keys through `process.env.API_KEY` in some places. This document defines the recommended environment variable strategy for local development and production deployments.

## Recommended Variables

### Supabase

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use these for:

- Database reads and writes.
- Authentication session lookups.
- Realtime admin broadcasts.

### Gemini / Google GenAI

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Use this for:

- AI-assisted property search.
- AI translation generation.
- AI assistant or creative tools.

For production, consider moving GenAI calls behind a backend endpoint so the API key is not exposed in client bundles.

### Application Metadata

Optional values:

```env
VITE_APP_NAME=AfriEstate
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
```

These can be used for environment banners, analytics metadata, callback URLs, and deployment-specific behavior.

## Example `.env.local`

```env
VITE_APP_NAME=AfriEstate
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Current Codebase Notes

### Supabase

`lib/supabase.ts` currently creates a Supabase client using literal values in source code. Recommended replacement:

```ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

Add a clear runtime guard for missing values in development.

### Gemini

Some code paths reference:

```ts
process.env.API_KEY
```

In Vite browser code, prefer:

```ts
import.meta.env.VITE_GEMINI_API_KEY
```

The README currently mentions `GEMINI_API_KEY`. Standardize on `VITE_GEMINI_API_KEY` for frontend access or route AI requests through a backend service with server-only secrets.

## Security Guidance

- Never commit `.env.local`.
- Treat all `VITE_` variables as public because they are embedded into browser bundles.
- Keep service-role Supabase keys strictly server-side and never use them in this frontend.
- Use Supabase Row Level Security for table access control.
- Use a backend proxy for sensitive AI workflows if abuse prevention or key secrecy matters.

## Deployment Provider Setup

### Vercel

Add variables in:

```text
Project Settings -> Environment Variables
```

### Netlify

Add variables in:

```text
Site configuration -> Environment variables
```

### Cloudflare Pages

Add variables in:

```text
Settings -> Environment variables
```

After changing environment variables, redeploy the app so Vite can include updated values in the build.
