# Frontend - Mini Job Search Platform

This frontend is built with **Next.js**, **TypeScript**, **TanStack Query**, **Tailwind CSS**, and **Axios** for the Peoplyee Fullstack Developer Technical Assessment.

## Features

- Browse job listings
- Search by keyword
- Filter by location and tag
- Sort and paginate results
- View job details on a dedicated page
- Handle loading and error states cleanly

## Folder Structure

```text
app/
  jobs/[id]/page.tsx
  layout.tsx
  page.tsx
components/ui/
features/jobs/
  components/
  utils/
lib/
providers/
types/
```

## Setup

1. Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- The frontend expects the backend API to be running on port `3001` by default.
- Query state is synced to the URL for a shareable search experience.
- See the root `README.md` for fullstack setup instructions.
