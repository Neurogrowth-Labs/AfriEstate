# Contributing to AfriEstate

Thank you for contributing to AfriEstate. This guide describes the recommended workflow, coding standards, and review expectations for this repository.

## Development Workflow

1. Create a branch from the latest main branch.
2. Install dependencies with `npm install`.
3. Make focused changes for a single feature or fix.
4. Run a production build before submitting changes.
5. Commit with a clear message.
6. Open a pull request with a concise summary and testing notes.

## Branch Naming

Use descriptive branch names:

```text
feature/add-investor-documents
fix/property-filter-price-range
docs/add-setup-guide
refactor/split-app-state
```

## Commit Messages

Use concise, imperative commit messages:

```text
Add product documentation
Fix property filter reset behavior
Refactor investor dashboard cards
```

## Code Style

- Use TypeScript for new application code.
- Prefer typed props and exported interfaces for reusable components.
- Keep components focused and composable.
- Avoid large unrelated changes in a single pull request.
- Do not wrap imports in `try/catch` blocks.
- Keep naming consistent with existing files and domain concepts.
- Prefer existing shared types from `types.ts` over duplicated local types.

## Component Guidelines

- Place page-level components in `components/pages/`.
- Place dashboard-specific features under the relevant dashboard folder.
- Place shared icons under `components/icons/`.
- Use modals for workflows that are already modal-driven in the platform.
- Keep local state local unless multiple parts of the app need it.
- Use contexts only for cross-cutting concerns.

## Data Access Guidelines

- Put Supabase data operations in `lib/data.ts` or a domain-specific data module if the file is split later.
- Keep database field mapping consistent between snake_case Supabase columns and camelCase frontend models.
- Ensure fallback or optimistic behavior is intentional and documented.
- Do not introduce service-role keys or server-only secrets into frontend code.

## Environment Variables

- Use Vite-style `VITE_` prefixes for browser-exposed environment variables.
- Do not commit `.env.local` or real secrets.
- Prefer `import.meta.env` in frontend code.
- See `ENVIRONMENT.md` for recommended variables.

## Testing and Validation

At minimum, run:

```bash
npm run build
```

If new tests are added in the future, run the relevant test command before opening a PR.

Recommended future checks:

```bash
npm run lint
npm test
```

These commands are not currently defined in `package.json`, so add scripts before requiring them in CI.

## Pull Request Checklist

Before requesting review, confirm:

- [ ] The change is focused and easy to review.
- [ ] The app builds successfully.
- [ ] New environment variables are documented.
- [ ] New Supabase tables or columns are documented.
- [ ] UI changes were manually checked in the browser.
- [ ] Screenshots are included for visible UI changes.
- [ ] Sensitive keys or credentials were not committed.

## Documentation Guidelines

Update documentation when changing:

- Setup steps.
- Environment variables.
- Supabase schema expectations.
- Deployment steps.
- Product architecture.
- User roles or major workflows.

Relevant docs:

- `ARCHITECTURE.md`
- `SETUP.md`
- `ENVIRONMENT.md`
- `SUPABASE_SCHEMA.md`
- `DEPLOYMENT.md`

## Security Review Expectations

Security-sensitive changes require extra care. Review for:

- Secret leakage.
- Missing Supabase Row Level Security assumptions.
- Unsafe rendering of user-generated content.
- Incorrect role-based access control.
- Overly permissive database policies.
- Abuse potential for frontend-exposed AI keys.

## Issue Reporting

When reporting bugs, include:

- Steps to reproduce.
- Expected behavior.
- Actual behavior.
- Browser and operating system.
- Console errors, if any.
- Screenshots or screen recordings for UI issues.
