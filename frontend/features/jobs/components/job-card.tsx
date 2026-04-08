import Link from "next/link"

import type { Job } from "@/types/job"

import {
    formatPostedDate,
    formatSalaryRange,
    truncateText,
} from "../utils/formatters"

export function JobCard({ job }: Readonly<{ job: Job }>) {
    return (
        <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-sky-700">{job.company}</p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-900">
                        {job.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{job.location}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {formatPostedDate(job.createdAt)}
                </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">
                {formatSalaryRange(job)}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                {truncateText(job.description, 220)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.length > 0 ? (
                    job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                        >
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        General
                    </span>
                )}
            </div>

            <div className="mt-auto pt-5">
                <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                    View details
                </Link>
            </div>
        </article>
    )
}
