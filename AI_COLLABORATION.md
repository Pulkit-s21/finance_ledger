# Project Details — Finance Ledger

This document is a companion to the main [README](README.md). It's written from my perspective as the developer, covering what the app does, which AI tool I used while building it, and — honestly — where that AI helped, where I did the core work myself, and where it fell short.

## What the app does

Finance Ledger is a personal finance tracker: log income, expenses, and investments, and keep an eye on whether you're staying within budget for the month.

### Features

- Email/password authentication (JWT-based, protected API routes)
- Add, edit, and soft-delete records with amount, category, date, and description
- Dashboard overview: total balance, per-category totals, biggest expense
- Filter records by category, month, and year; sort by date or amount
- CSV and PDF export of the currently filtered record list
- A monthly budget limit per calendar month, with an in-app alert once spending hits 90% of it
- A budget **pace chart** — plots cumulative spend for the month against an "even pace to limit" reference line and a linear projection of where you'll land by month-end
- Toast notifications for record and budget actions
- A spending breakdown chart (doughnut)
- Deployed on Render (frontend + backend as separate services), database on Neon Postgres

## The AI tool I used

I used **Claude Code** (Anthropic's agentic CLI, running Claude) as a pair-programmer throughout most of this project's feature work. I want to be specific about how, because "I used AI" on its own doesn't say much.

### What I built myself

The authentication system — registration, login, JWT issuance, the auth middleware protecting routes — was mine. I wrote that before I started looping AI into the workflow, and it's the foundation everything else sits on.

I also drove every product decision in this project: what filters to add, how the budget threshold should behave (90% alert, ignore mid-month income swings, scoped per calendar month), what to export and in what format, and the call to rip out the OpenAI chat feature entirely once I decided it wasn't worth paying for. When Claude asked clarifying questions — email vs. in-app notifications, one budget per month vs. one recurring limit, export the filtered view vs. everything — I made those calls.

I decided to add to make the project stand out was the budget pace/burn-down chart. Instead of only showing current spending, it projects the user's month-end expenses based on their average daily spending so far and compares that projection against an ideal, even-paced budget line. I also added guardrails to make the feature more useful and less misleading, such as only showing projections after enough spending data has been collected, rather than making predictions from just the first day or two.

### Where Claude actually helped

Most of the UI is Claude's work, directed by me. I'd describe what I wanted in plain terms — "add more filters, sort by amount and date," "add toasts for record actions," "redo the dashboard UI, make it modern and pretty" — and Claude implemented the components (the toast system, the redesigned stat cards and balance hero, the budget tracker card, the pace chart). When I looked at the result and said the filter section felt cramped, it restructured that section with labeled groups instead of a jammed row of controls.

For backend features with a clear spec, I described exactly what I wanted and let Claude write the implementation — the budget engine (schema, the daily-spend aggregation, the 90%-threshold logic), the record filter/sort logic, and the CSV/PDF export utilities. I reviewed and tested each of those rather than typing them line-by-line myself.

For deployment, Claude doesn't have access to my Render account, so it could only give me steps — build/start commands, which env vars to set, why `tsx`/`prisma` needed to move out of devDependencies. I executed all of that myself in the Render dashboard, including diagnosing the actual "Exited with status 127" and 404 failures by pasting logs back and forth until we found it.

### Where it fell short

The clearest example was deploying the frontend to Render. Claude's first pass at the deployment steps had me set the client's Start Command to `next start -p $PORT`, which sounds reasonable — but Render runs a Start Command as a raw shell command, not through `npm`, so `node_modules/.bin` was never on the `PATH` and the deploy failed immediately with `next: command not found` (exit 127). That's a gap Claude should have anticipated upfront instead of finding out from a failed production deploy: `npm`-installed binaries need to be invoked through `npm start`/`npx`, not called directly, and that's a basic fact about how Node deployments work, not an edge case.

Even after Claude diagnosed it from the log and had me switch the Start Command to `npm start`, the next deploy still failed the same way — the dashboard setting hadn't actually taken effect yet, and Claude had no way to check that itself since it has no access to my Render account. I had to go back into the dashboard, confirm the field had actually saved, and manually trigger a fresh deploy before it finally came up. Then, on top of that, hitting `/dashboard` briefly returned a 404 with a Render-specific header (`x-render-routing: no-server`) that took another round of me pasting the exact response headers before we could confirm it meant "no live instance," not an app-level routing bug — something only visible from my side, not something Claude could infer from the code.

So the actual pattern: Claude's code and reasoning were fine once it had the facts, but the facts about a live deployment — what's actually running, what a dashboard field currently says, what a platform-specific response header means — only exist on my end. Every one of those had to be surfaced by me pasting logs, and every fix had to be applied by me directly in Render.

## Takeaway

The split, roughly: I owned the architecture, the auth system, every product decision, and all of the deployment work end to end. Claude was most useful as an implementation partner for well-specified UI and feature work, and occasionally as a source of ideas when I asked for one directly. The one place that division showed its limits was deployment — Claude could reason well once I fed it a log, but it had no visibility into the actual running system, so getting from "build succeeded" to "the site actually works" took several rounds of me checking Render directly and reporting back.
