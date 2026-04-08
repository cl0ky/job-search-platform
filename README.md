# Mini Job Search Platform

A simple fullstack job search platform built for the **Peoplyee Fullstack Developer Technical Assessment**.

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TanStack Query
- Tailwind CSS
- Axios

### Backend
- Express
- TypeScript
- Prisma
- PostgreSQL

## Features

- Browse job listings
- Search jobs by keyword
- Filter by location and tag
- View job detail page
- Pagination and sorting
- Loading and error states

## Project Structure

```text
backend/
  prisma/
  src/
    controllers/
    middleware/
    prisma/
    routes/
    services/
    validation/
frontend/
  app/
    jobs/[id]/page.tsx
  components/ui/
  features/jobs/
    components/
    utils/
  lib/
  providers/
  types/
```

## Setup Instructions

### 1. Backend

Create `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/job_search_platform"
PORT=3001
```

Install dependencies and run migrations:

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

Backend API runs at:

```text
http://localhost:3001/api/jobs
```

### 2. Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Install dependencies and run the app:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## API Notes

Supported query params for `GET /api/jobs`:

- `search`
- `location`
- `tag`
- `page`
- `limit`
- `sortBy` (`createdAt`, `title`, `company`)
- `order` (`asc`, `desc`)

## Design Decisions / Assumptions

- The homepage is focused on job browsing and filtering for fast evaluation.
- TanStack Query is used for clean client-side data fetching and cache handling.
- Filter state is reflected in the URL query string for shareable search results.
- Salary is displayed only when available.
- The UI is intentionally simple, responsive, and maintainable over visually complex.
