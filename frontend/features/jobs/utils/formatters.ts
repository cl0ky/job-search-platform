import type { Job } from "@/types/job"

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
})

export function formatSalaryRange(job: Pick<Job, "salaryMin" | "salaryMax">) {
    if (job.salaryMin != null && job.salaryMax != null) {
        return `${currencyFormatter.format(job.salaryMin)} - ${currencyFormatter.format(job.salaryMax)}`
    }

    if (job.salaryMin != null) {
        return `From ${currencyFormatter.format(job.salaryMin)}`
    }

    if (job.salaryMax != null) {
        return `Up to ${currencyFormatter.format(job.salaryMax)}`
    }

    return "Salary not disclosed"
}

export function formatPostedDate(dateString: string) {
    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
        return "Recently"
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
    }).format(date)
}

export function truncateText(text: string, maxLength = 180) {
    if (text.length <= maxLength) {
        return text
    }

    return `${text.slice(0, maxLength).trim()}...`
}
