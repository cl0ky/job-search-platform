export function JobListSkeleton({
    count = 6,
}: Readonly<{ count?: number }>) {
    const skeletonIds = Array.from({ length: count }, () => crypto.randomUUID())

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {skeletonIds.map((skeletonId) => (
                <div
                    key={skeletonId}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-slate-100" />
                    <div className="mt-2 h-4 w-9/12 animate-pulse rounded bg-slate-100" />
                    <div className="mt-4 flex gap-2">
                        <div className="h-7 w-20 animate-pulse rounded-full bg-sky-100" />
                        <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    )
}
