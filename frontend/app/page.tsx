import { connection } from "next/server"

import { JobBoard } from "@/features/jobs/components/job-board"

export default async function HomePage() {
  await connection()

  return <JobBoard />
}
