export type Job = {
    id: string
    title: string
    company: string
    location: string
    salaryMin: number | null
    salaryMax: number | null
    description: string
    tags: string[]
    createdAt: string
}

export type JobSortBy = "createdAt" | "title" | "company"
export type JobSortOrder = "asc" | "desc"

export type JobsQueryParams = {
    search: string
    location: string
    tag: string
    page: number
    limit: number
    sortBy: JobSortBy
    order: JobSortOrder
}

export type JobsResponse = {
    data: Job[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}
