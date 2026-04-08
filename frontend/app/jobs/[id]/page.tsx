"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

import { StatusMessage } from "@/components/ui/status-message"
import { fetchJobById } from "@/features/jobs/api"
import { JobDetail } from "@/features/jobs/components/job-detail"
import { getErrorMessage } from "@/lib/api/client"

function JobDetailSkeleton() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                <div className="mt-6 h-32 animate-pulse rounded-2xl bg-slate-100" />
            </div>
        </div>
    )
}

export default function JobDetailPage() {
    const params = useParams<{ id: string }>()
    const jobId = Array.isArray(params.id) ? params.id[0] : params.id

    const { data, error, isError, isPending } = useQuery({
        queryKey: ["job", jobId],
        queryFn: () => fetchJobById(jobId ?? ""),
        enabled: Boolean(jobId),
    })

    if (!jobId) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <StatusMessage
                    tone="error"
                    title="Invalid job"
                    message="The requested job could not be identified from the current URL."
                />
            </div>
        )
    }

    if (isPending) {
        return <JobDetailSkeleton />
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <StatusMessage
                    tone="error"
                    title="Unable to load job details"
                    message={getErrorMessage(error)}
                />
            </div>
        )
    }

    return <JobDetail job={data} />
}
