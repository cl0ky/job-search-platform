import Link from "next/link"

import type { Job } from "@/types/job"

import { formatPostedDate, formatSalaryRange } from "../utils/formatters"

export function JobDetail({ job }: { job: Job }) {
    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="inline-flex items-center text-sm font-semibold text-sky-700 transition-colors hover:text-sky-900"
            >
                ← Back to job listings
            </Link>

            <article className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                            {job.company}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            {job.title}
                        </h1>
                        <p className="mt-2 text-base text-slate-600">{job.location}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <p>
                            <span className="font-semibold text-slate-900">Posted:</span>{" "}
                            {formatPostedDate(job.createdAt)}
                        </p>
                        <p className="mt-1">
                            <span className="font-semibold text-slate-900">Salary:</span>{" "}
                            {formatSalaryRange(job)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.length > 0 ? (
                        job.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                            General
                        </span>
                    )}
                </div>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold text-slate-900">Job description</h2>
                    <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-700">
                        {job.description}
                    </p>
                </section>
            </article>
        </div>
    )
}
