# Finance Ledger

A personal finance tracker for logging income, expenses, and investments, with monthly budgets, filtering/sorting, CSV/PDF export, and a dashboard overview.

**Live app:** [https://fe-tlbs.onrender.com](https://fe-tlbs.onrender.com)

## Features

- Email/password authentication (JWT)
- Add, edit, and delete records (income / expense / investment) with amount, category, date, and description
- Dashboard with total balance, per-category totals, and biggest expense
- Filter records by category, month, and year; sort by date or amount
- Monthly budget limit per calendar month, with an in-app alert at 90% of the limit
- Export the currently filtered record list to CSV or PDF
- Toast notifications for record and budget actions
- Spending breakdown chart

## Tech stack

**Client** — Next.js (App Router), React, TypeScript, Tailwind CSS, Chart.js, jsPDF
**Server** — Express, TypeScript, Prisma, PostgreSQL (hosted on Neon)
**Auth** — JWT, bcrypt

## Project structure

```
.
├── client/   # Next.js frontend
└── server/   # Express API + Prisma schema/migrations
```

## Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) project)

## Setup

### 1. Server

```bash
cd server
npm install
```

Create `server/.env`:

```
PORT=3000
JWT_KEY=<any-long-random-secret>
DATABASE_URL=<your-postgres-connection-string>
```

Apply migrations and generate the Prisma client:

```bash
npx prisma migrate deploy
npx prisma generate
```

Start the API:

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default.

### 2. Client

```bash
cd client
npm install
```

Create `client/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the app:

```bash
npm run dev
```

The client runs on `http://localhost:3001` (or the next available port) — open it in your browser and register a new account to get started.

## API overview

| Method | Route            | Description                          |
| ------ | ----------------- | ------------------------------------ |
| POST   | `/auth/register`  | Create an account                    |
| POST   | `/auth/login`     | Log in, returns a JWT                |
| GET    | `/auth/me`        | Get the current authenticated user   |
| GET    | `/record/all`     | List records                         |
| POST   | `/record/create`  | Create a record                      |
| POST   | `/record/update`  | Update a record                      |
| POST   | `/record/delete`  | Soft-delete a record                 |
| GET    | `/budget/status`  | Get spend vs. limit for a month/year |
| POST   | `/budget/set`     | Set the budget limit for a month     |

All routes except `/auth/register` and `/auth/login` require an `Authorization: Bearer <token>` header.

## Deployment

The app is deployed on [Render](https://render.com) as two separate web services:

- **server** — Root directory `server`, build command `npm install && npm run build` (runs `prisma generate && prisma migrate deploy`), start command `npm start`. Requires `DATABASE_URL` and `JWT_KEY` env vars.
- **client** — Root directory `client`, build command `npm install && npm run build`, start command `npm start` (runs `next start -p $PORT`). Requires `NEXT_PUBLIC_API_URL` set to the deployed server's URL.
