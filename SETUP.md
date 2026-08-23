# AfriEstate Setup Guide

## Prerequisites

Install the following before running AfriEstate locally:

- Node.js 20 or newer is recommended.
- npm, included with Node.js.
- A Gemini API key if you want AI features to work.
- Supabase project access if you want live backend persistence instead of demo fallback data.

## Clone the Repository

```bash
git clone <repository-url>
cd AfriEstate
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a local environment file:

```bash
touch .env.local
```

Add the values needed by your environment. See `ENVIRONMENT.md` for the full list and naming recommendations.

Example:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Note: the current codebase references some hardcoded Supabase configuration and also references AI keys through `process.env.API_KEY` in some places. See `ENVIRONMENT.md` for cleanup recommendations.

## Start the Development Server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually similar to:

```text
http://localhost:5173
```

## Build the App

```bash
npm run build
```

The production build is emitted to `dist/`.

## Preview the Production Build

```bash
npm run preview
```

This starts a local server for the compiled production assets.

## Optional Supabase Setup

If using live Supabase data:

1. Create or select a Supabase project.
2. Create tables matching the data access expectations in `lib/data.ts`.
3. Configure Row Level Security policies.
4. Add your Supabase project URL and anon key to `.env.local`.
5. Seed sample records manually or with `seed_db.ts` if configured for your environment.

## Optional Gemini Setup

AI-powered features require a valid Gemini API key.

1. Create a Gemini API key through Google AI Studio or your Google Cloud setup.
2. Add the key to `.env.local`.
3. Ensure code references use Vite-compatible environment access, such as `import.meta.env.VITE_GEMINI_API_KEY`.

## Common Development Tasks

### Run Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Troubleshooting

### Blank Page or Runtime Environment Errors

- Ensure dependencies were installed with `npm install`.
- Check the browser console for missing environment variable errors.
- Verify that Vite environment variables start with `VITE_`.

### Supabase Data Not Loading

- Confirm the Supabase project is reachable.
- Verify table names match the names used in `lib/data.ts`.
- Check Row Level Security policies.
- Check whether the app is falling back to mock data from `constants.ts`.

### AI Features Not Working

- Confirm the Gemini key is configured.
- Check for mismatched variable names such as `GEMINI_API_KEY`, `API_KEY`, and `VITE_GEMINI_API_KEY`.
- Remember that frontend-exposed keys are visible to users. Use a backend proxy for production-grade key protection.
