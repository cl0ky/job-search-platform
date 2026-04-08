import type { ReactNode } from "react"

type EmptyStateProps = Readonly<{
    title: string
    description: string
    action?: ReactNode
}>

export function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                No results
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
            {action ? <div className="mt-5">{action}</div> : null}
        </div>
    )
}
