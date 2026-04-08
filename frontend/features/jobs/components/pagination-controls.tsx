type PaginationControlsProps = Readonly<{
    page: number
    totalPages: number
    isDisabled?: boolean
    onPageChange: (page: number) => void
}>

export function PaginationControls({
    page,
    totalPages,
    isDisabled = false,
    onPageChange,
}: PaginationControlsProps) {
    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">
                Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
                <span className="font-semibold text-slate-900">{totalPages}</span>
            </p>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={isDisabled || page <= 1}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={isDisabled || page >= totalPages}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
