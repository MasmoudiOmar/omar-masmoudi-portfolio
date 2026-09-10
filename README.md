# Omar Masmoudi — Portfolio

Personal portfolio site. React 19 + Vite + Tailwind, deployed to Cloudflare Pages.

Resume content lives in a single source of truth: [`constants.ts`](./constants.ts).
Editing that file updates the site *and* the AI assistant's knowledge.

## Run locally

```bash
bun install
bun run dev
```

The site runs at http://localhost:3000.

The AI assistant needs a Gemini API key. Create a `.env.local` (git-ignored):

```
GEMINI_API_KEY=your-key-here
```

Without it, the assistant replies "The assistant is not configured right now."
and the rest of the site works normally.

## The AI assistant

The chat widget answers recruiter questions from the resume data.

The Gemini call happens **server-side** in a Cloudflare Pages Function at
[`functions/api/chat.ts`](./functions/api/chat.ts). The API key is a Cloudflare
secret and is never shipped to the browser — the client only ever talks to
`/api/chat`.

In local dev, a Vite middleware (see `vite.config.ts`) runs that exact same
handler, so dev and production behave identically.

## Deploy (Cloudflare Pages)

Build settings:

| Setting | Value |
| --- | --- |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Functions directory | `functions` (auto-detected) |

Then add the API key as an **encrypted** environment variable, so it stays out
of the build output:

```bash
npx wrangler pages secret put GEMINI_API_KEY
```

Or in the dashboard: **Workers & Pages → your project → Settings → Variables and
Secrets → Add → type: Secret**, name `GEMINI_API_KEY`. Add it to both the
Production and Preview environments if you want previews to work.

Redeploy after adding the secret — Functions only pick up variables at deploy time.

### Free-tier limits

Both halves are free:

- **Cloudflare Pages Functions** — 100,000 requests/day.
- **Gemini API free tier** — rate-limited requests to `gemini-2.5-flash`, no card required.

The Function caps message length (1000 chars) and history (12 turns) to keep
usage predictable.

## Project structure

```
constants.ts            Resume data — single source of truth
types.ts                Shared types
App.tsx                 Layout, nav, footer
components/             Hero, Experience, Skills, Projects, Education, ChatInterface
services/geminiService  Thin client for /api/chat
functions/api/chat.ts   Cloudflare Pages Function (server-side Gemini call)
public/                 CV PDF, _redirects
```
