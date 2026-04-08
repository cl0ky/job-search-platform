import type { ReadonlyURLSearchParams } from "next/navigation"

import { apiClient } from "@/lib/api/client"
import type {
    Job,
    JobsQueryParams,
    JobsResponse,
    JobSortBy,
} from "@/types/job"

export const DEFAULT_JOBS_QUERY: JobsQueryParams = {
    search: "",
    location: "",
    tag: "",
    page: 1,
    limit: 6,
    sortBy: "createdAt",
    order: "desc",
}

const VALID_SORT_BY = new Set<JobSortBy>(["createdAt", "title", "company"])

function normalizeJobsQuery(params: Partial<JobsQueryParams>): JobsQueryParams {
    const sortBy = params.sortBy ?? DEFAULT_JOBS_QUERY.sortBy

    return {
        search: params.search?.trim() ?? "",
        location: params.location?.trim() ?? "",
        tag: params.tag?.trim() ?? "",
        page: params.page && params.page > 0 ? params.page : 1,
        limit: params.limit && params.limit > 0 ? params.limit : DEFAULT_JOBS_QUERY.limit,
        sortBy: VALID_SORT_BY.has(sortBy) ? sortBy : DEFAULT_JOBS_QUERY.sortBy,
        order: params.order === "asc" ? "asc" : "desc",
    }
}

export function parseJobsQuery(
    searchParams: URLSearchParams | ReadonlyURLSearchParams | null,
): JobsQueryParams {
    if (!searchParams) {
        return DEFAULT_JOBS_QUERY
    }

    const sortBy = searchParams.get("sortBy") as JobSortBy | null
    const order = searchParams.get("order")
    const page = Number(searchParams.get("page") ?? DEFAULT_JOBS_QUERY.page)

    return normalizeJobsQuery({
        search: searchParams.get("search") ?? "",
        location: searchParams.get("location") ?? "",
        tag: searchParams.get("tag") ?? "",
        page: Number.isFinite(page) ? page : DEFAULT_JOBS_QUERY.page,
        sortBy: sortBy ?? DEFAULT_JOBS_QUERY.sortBy,
        order: order === "asc" ? "asc" : "desc",
        limit: DEFAULT_JOBS_QUERY.limit,
    })
}

export function buildJobsSearchParams(params: Partial<JobsQueryParams>) {
    const normalized = normalizeJobsQuery(params)
    const nextParams = new URLSearchParams()

    if (normalized.search) {
        nextParams.set("search", normalized.search)
    }

    if (normalized.location) {
        nextParams.set("location", normalized.location)
    }

    if (normalized.tag) {
        nextParams.set("tag", normalized.tag)
    }

    if (normalized.page > 1) {
        nextParams.set("page", String(normalized.page))
    }

    if (normalized.sortBy !== DEFAULT_JOBS_QUERY.sortBy) {
        nextParams.set("sortBy", normalized.sortBy)
    }

    if (normalized.order !== DEFAULT_JOBS_QUERY.order) {
        nextParams.set("order", normalized.order)
    }

    return nextParams
}

export async function fetchJobs(params: Partial<JobsQueryParams>) {
    const normalized = normalizeJobsQuery(params)

    const response = await apiClient.get<JobsResponse>("/jobs", {
        params: {
            ...(normalized.search ? { search: normalized.search } : {}),
            ...(normalized.location ? { location: normalized.location } : {}),
            ...(normalized.tag ? { tag: normalized.tag } : {}),
            page: normalized.page,
            limit: normalized.limit,
            sortBy: normalized.sortBy,
            order: normalized.order,
        },
    })

    return response.data
}

export async function fetchJobById(id: string) {
    const response = await apiClient.get<Job>(`/jobs/${id}`)

    return response.data
}
