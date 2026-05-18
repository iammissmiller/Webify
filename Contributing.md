# Contributing to WEBIFY

Thank you for your interest in contributing to **WEBIFY**! 🎉
This project is part of **GirlScript Summer of Code (GSSoC)** and we welcome contributions from everyone — whether you're fixing a bug, adding a feature, or improving documentation.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure-detailed)
- [Development Workflow](#development-workflow)
- [Making a Contribution](#making-a-contribution)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Style Guide](#style-guide)
- [Need Help?](#need-help)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, constructive, and collaborative. Harassment or dismissive behavior of any kind will not be tolerated.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Fork & Clone

1. **Fork** this repository by clicking the "Fork" button on GitHub.

2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/webify.git
   cd webify
   ```

3. **Add the upstream remote** to keep your fork in sync:

   ```bash
   git remote add upstream https://github.com/<original-owner>/webify.git
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:3000`.

---

## Project Structure (Detailed)

```
webify/
├── app/                    # Next.js App Router pages and layouts
│   ├── components/         # Page-level components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   └── ui/                 # Reusable UI components (shadcn/ui)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── copy-button.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sonner.tsx
│       └── tabs.tsx
├── lib/                    # Utility functions and helpers
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.*       # Tailwind CSS configuration
├── components.json         # shadcn/ui component config
└── netlify.toml            # Netlify deployment config
```

---

## Development Workflow

1. **Sync with upstream** before starting any new work:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a new branch** for your changes (branch off `main`):

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. Make your changes, then **test locally** before pushing:

   ```bash
   npm run dev       # Run dev server
   npm run build     # Ensure production build passes
   npm run lint      # Check for linting errors
   ```

4. **Commit and push** your branch:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feat/your-feature-name
   ```

5. Open a **Pull Request** on GitHub.

---

## Making a Contribution

### Find an Issue

- Browse [open issues](../../issues) and look for ones labelled `good first issue` or `GSSoC`.
- **Comment on the issue** to get it assigned to you before starting work.
- Do not submit a PR for an issue that isn't assigned to you.

### Working on UI Components

WEBIFY uses [shadcn/ui](https://ui.shadcn.com/) components located in `components/ui/`. When contributing new components:

- Follow the existing component patterns in that directory.
- Add components via the shadcn CLI where possible:
  ```bash
  npx shadcn-ui@latest add <component-name>
  ```
- Keep components generic and reusable.

### Working on Pages / Features

- New pages go inside the `app/` directory following Next.js App Router conventions.
- Page-specific components belong in `app/components/`.
- Shared/reusable logic goes in `lib/`.

---

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>
```

| Type       | Use for                                    |
| ---------- | ------------------------------------------ |
| `feat`     | A new feature                              |
| `fix`      | A bug fix                                  |
| `docs`     | Documentation changes only                 |
| `style`    | Formatting, missing semicolons, etc.       |
| `refactor` | Code restructuring without behavior change |
| `test`     | Adding or updating tests                   |

**Examples:**

```
feat: add dark mode toggle to navbar
fix: resolve button alignment on mobile
docs: update README with deployment steps
```

---

## Pull Request Guidelines

- **One PR per issue.** Don't bundle unrelated changes.
- Fill out the **PR template** completely (description, screenshots if UI changes, related issue number).
- Link the issue in your PR description using `Closes #<issue-number>`.
- Ensure your branch is up to date with `main` before opening a PR.
- PRs must pass all checks (lint, build) before review.
- Be responsive to review comments — address feedback promptly.
- Do **not** force-push to a PR branch after review has started.

---

## Style Guide

- **Language:** TypeScript is used throughout. Avoid `any` types where possible.
- **Styling:** Use [Tailwind CSS](https://tailwindcss.com/) utility classes. Avoid writing custom CSS unless absolutely necessary.
- **Components:** Follow existing patterns in `components/ui/`. Use `shadcn/ui` conventions.
- **Formatting:** The project uses ESLint (`eslint.config.mjs`). Run `npm run lint` before committing.

---

## Need Help?

- Check existing [issues](../../issues) and [pull requests](../../pulls) first.
- If you're stuck, comment on the relevant issue and ask for guidance.
- For GSSoC-specific queries, refer to the [GSSoC official documentation](https://gssoc.girlscript.tech/).

We're excited to have you on board. Happy contributing! 🚀
