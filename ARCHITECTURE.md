# AfriEstate Architecture

## Overview

AfriEstate is a Vite-powered React and TypeScript single-page application for real estate discovery, short-term stays, wellness services, transport rentals, and investment workflows. The app is organized around a central `App.tsx` shell that owns page state, product workflow state, and modal visibility, while reusable components implement the marketplace, dashboard, AI, communication, and service experiences.

The application is primarily client-side. It talks directly to Supabase for persistence, authentication/session checks, and realtime broadcasts. It also uses Google GenAI for AI-assisted search and language translation flows.

## High-Level System Diagram

```text
Browser
  |
  | React + Vite SPA
  v
App.tsx
  |-- Page components
  |-- Marketplace components
  |-- Dashboard components
  |-- Modal components
  |-- Context providers
  |
  |--> lib/data.ts ---------> Supabase database tables
  |--> lib/supabase.ts -----> Supabase auth/realtime/database client
  |--> Google GenAI --------> AI search, translation, generated content
  |
  v
Local browser storage
  |-- theme
  |-- language
  |-- currency
  |-- selected cached preferences
```

## Frontend Architecture

### Application Shell

`App.tsx` is the primary orchestration layer. It manages:

- Active top-level page state.
- Search filters.
- Property collections.
- Authentication modal state.
- Current user state.
- Saved properties and saved searches.
- Tour requests, messages, reviews, leads, and calendar events.
- Agent, investor, and super admin workflows.
- Blog posts and notifications.
- Modal open/close state.
- Theme and currency behavior.
- AI search interactions.

The app currently uses internal React state for navigation instead of a dedicated routing library.

### Pages

Page-level views live in `components/pages/`:

- `AboutPage.tsx`
- `BookAStayPage.tsx`
- `ContactPage.tsx`
- `FindWellnessPage.tsx`
- `PricingPage.tsx`
- `RentACarPage.tsx`
- `ServicesPage.tsx`
- `StayDetailsPage.tsx`

These are selected by the `Page` state union in `App.tsx`.

### Components

Most product capabilities are implemented as reusable components in `components/`, including:

- Marketplace listing and discovery components.
- Search, category, and recommendation components.
- Modal workflows.
- Communication components.
- Financial tools.
- AI-powered experiences.
- Dashboard widgets.

### Dashboards

Dashboard implementations are grouped by user type:

```text
components/dashboards/
├── AgentDashboard.tsx
├── InvestorDashboard.tsx
├── SuperAdminDashboard.tsx
├── agent/
├── investor/
└── superadmin/
```

Agent and investor dashboards are feature-rich, role-specific workspaces. The super admin dashboard uses admin data and realtime broadcast support.

### Context Providers

Global app concerns are implemented with React contexts in `contexts/`:

- `AdminStateContext.tsx`: Supabase Realtime admin action broadcasts.
- `CurrencyContext.tsx`: currency selection, conversion, and formatting.
- `LanguageContext.tsx`: language selection and AI-assisted translation.
- `ToastContext.tsx`: transient in-app notifications.

## Data Architecture

### Type System

Core product models are declared in `types.ts`, including:

- Listing and property enums.
- Property records.
- Search filters.
- Users and role-specific profile details.
- Messages and tour requests.
- Reviews, leads, notifications, documents, investment data, and dashboard models.

### Mock and Seed Data

`constants.ts` contains sample properties, categories, achievements, marketplace content, notifications, currency configuration, and other demo/platform content. The app uses this content both for UI examples and as a fallback when remote data is unavailable.

### Supabase Client

`lib/supabase.ts` creates the Supabase client and runs an initial session check. The current implementation contains a concrete Supabase URL and anon key directly in source code. Production deployments should move these values into environment variables.

### Data Access Layer

`lib/data.ts` centralizes Supabase access and fallback behavior. It includes helper functions for:

- Properties.
- Saved properties.
- Saved searches.
- Tour requests.
- Messages.
- Reviews.
- Calendar events.
- Agent profiles.
- Leads.
- Investor settings.
- Investment requests.
- Notifications.

The layer often returns mock or optimistic data when Supabase is unavailable, which is useful for demos but should be reviewed for production consistency.

## AI Architecture

The app uses Google GenAI through `@google/genai`.

Current AI-enabled areas include:

- Natural-language property search filter parsing.
- AI-generated translation values for non-English languages.
- AI assistant and creative suite components.
- AI-assisted dashboard tools and portfolio summaries.

AI calls should be routed through environment-configured API keys. Any direct frontend AI key usage should be considered public from a security perspective.

## Realtime Architecture

`AdminStateContext.tsx` uses Supabase Realtime channels to broadcast administrative events:

- Channel: `admin-state-broadcast`
- Event: `admin-action`

The provider exposes `broadcastAdminAction` and `lastAction` to subscribed components.

## State Management

State management is currently a combination of:

- Central `useState` hooks in `App.tsx`.
- Context providers for cross-cutting app state.
- Local component state inside modals, pages, and dashboards.
- Browser `localStorage` for selected preferences.

For future scale, consider extracting major domains into reducer-based contexts, server-state tools, or a routing/data framework.

## Styling and UI

The UI is component-driven and uses utility class names throughout the React components. Icons come from Heroicons, Lucide React, and custom icon components under `components/icons/`.

## Security Considerations

Before production use:

1. Move Supabase URL and anon key configuration into environment variables.
2. Confirm Supabase Row Level Security policies for all tables.
3. Do not store secrets in frontend source code.
4. Treat all browser environment variables as public unless mediated by a backend.
5. Validate all user-generated content before storage and rendering.
6. Review `rehype-raw` usage because raw HTML rendering can introduce XSS risk if content is untrusted.
7. Replace demo authentication assumptions and optimistic fallbacks with explicit error handling for production-critical workflows.

## Recommended Evolution

- Introduce a router such as React Router if deep links and browser navigation become important.
- Normalize environment variables across the codebase.
- Add a formal Supabase migration/schema workflow.
- Add automated tests for data access, modal workflows, dashboards, and critical user journeys.
- Split `App.tsx` into smaller domain containers as the platform grows.
