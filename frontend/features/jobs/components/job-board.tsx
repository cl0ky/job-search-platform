"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { EmptyState } from "@/components/ui/empty-state"
import { StatusMessage } from "@/components/ui/status-message"
import { getErrorMessage } from "@/lib/api/client"
import type { JobsQueryParams } from "@/types/job"

import {
    buildJobsSearchParams,
    fetchJobs,
    parseJobsQuery,
} from "../api"
import { JobCard } from "./job-card"
import { JobFilters } from "./job-filters"
import { JobListSkeleton } from "./job-list-skeleton"
import { PaginationControls } from "./pagination-controls"

type FilterState = Pick<
    JobsQueryParams,
    "search" | "location" | "tag" | "sortBy" | "order"
>

function buildPageUrl(currentQuery: JobsQueryParams, nextQuery: Partial<JobsQueryParams>) {
    const params = buildJobsSearchParams({
        ...currentQuery,
        ...nextQuery,
    })
    const queryString = params.toString()

    return queryString ? `/?${queryString}` : "/"
}

export function JobBoard() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const query = useMemo(() => parseJobsQuery(searchParams), [searchParams])

    const { data, error, isError, isFetching, isPending, refetch } = useQuery({
        queryKey: ["jobs", query],
        queryFn: () => fetchJobs(query),
        placeholderData: keepPreviousData,
    })

    const filters: FilterState = {
        search: query.search,
        location: query.location,
        tag: query.tag,
        sortBy: query.sortBy,
        order: query.order,
    }

    const totalJobs = data?.pagination.total ?? 0
    const totalPages = data?.pagination.totalPages ?? 0
    const jobs = data?.data ?? []

    function handleApply(nextFilters: FilterState) {
        router.push(buildPageUrl(query, { ...nextFilters, page: 1 }))
    }

    function handleReset() {
        router.push("/")
    }

    function handlePageChange(page: number) {
        router.push(buildPageUrl(query, { page }))
    }

    return (
        <div className="pb-12">
            <section className="border-b border-slate-200 bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                        Peoplyee Technical Assessment
                    </p>
                    <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Find your next role in one clean dashboard.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                        Browse jobs, search by keyword, filter by location or tag, and
                        review detailed job information with a responsive UI built in
                        Next.js.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-slate-300">Jobs found</p>
                            <p className="mt-2 text-2xl font-semibold">{totalJobs}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-slate-300">Current page</p>
                            <p className="mt-2 text-2xl font-semibold">{query.page}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-slate-300">Active tag</p>
                            <p className="mt-2 text-2xl font-semibold">
                                {query.tag || "All"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <aside>
                        <JobFilters
                            value={filters}
                            resultCount={totalJobs}
                            isFetching={isFetching}
                            onApply={handleApply}
                            onReset={handleReset}
                        />
                    </aside>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Available opportunities
                                </h2>
                                <p className="text-sm text-slate-600">
                                    Search by role, company, location, or a skill tag.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    void refetch()
                                }}
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Refresh data
                            </button>
                        </div>

                        {isPending ? <JobListSkeleton /> : null}

                        {isError ? (
                            <StatusMessage
                                tone="error"
                                title="Failed to load jobs"
                                message={getErrorMessage(error)}
                            />
                        ) : null}

                        {!isPending && !isError && jobs.length === 0 ? (
                            <EmptyState
                                title="No jobs match your filters"
                                description="Try a broader keyword, another location, or reset the filters to see all listings."
                                action={
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                                    >
                                        Show all jobs
                                    </button>
                                }
                            />
                        ) : null}

                        {!isPending && !isError && jobs.length > 0 ? (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {jobs.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>

                                <PaginationControls
                                    page={query.page}
                                    totalPages={totalPages}
                                    isDisabled={isFetching}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    )
}
