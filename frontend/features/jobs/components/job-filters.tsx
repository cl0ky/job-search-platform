"use client"

import { useEffect, useState } from "react"

import type { JobsQueryParams } from "@/types/job"

type FilterState = Pick<
    JobsQueryParams,
    "search" | "location" | "tag" | "sortBy" | "order"
>

type JobFiltersProps = Readonly<{
    value: FilterState
    resultCount: number
    isFetching: boolean
    onApply: (filters: FilterState) => void
    onReset: () => void
}>

export function JobFilters({
    value,
    resultCount,
    isFetching,
    onApply,
    onReset,
}: JobFiltersProps) {
    const [draft, setDraft] = useState<FilterState>(value)

    useEffect(() => {
        setDraft(value)
    }, [value])

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                onApply(draft)
            }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Filter jobs</h2>
                    <p className="mt-1 text-sm text-slate-600">
                        {resultCount} role{resultCount === 1 ? "" : "s"} found
                    </p>
                </div>
                {isFetching ? (
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                        Refreshing...
                    </span>
                ) : null}
            </div>

            <div className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1 block">Keyword</span>
                    <input
                        type="text"
                        value={draft.search}
                        onChange={(event) => {
                            setDraft((current) => ({
                                ...current,
                                search: event.target.value,
                            }))
                        }}
                        placeholder="Frontend, React, product..."
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
                    />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1 block">Location</span>
                    <input
                        type="text"
                        value={draft.location}
                        onChange={(event) => {
                            setDraft((current) => ({
                                ...current,
                                location: event.target.value,
                            }))
                        }}
                        placeholder="Jakarta, Remote, Singapore..."
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
                    />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1 block">Tag</span>
                    <input
                        type="text"
                        value={draft.tag}
                        onChange={(event) => {
                            setDraft((current) => ({
                                ...current,
                                tag: event.target.value,
                            }))
                        }}
                        placeholder="TypeScript, Backend, Fullstack..."
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
                    />
                </label>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-1 block">Sort by</span>
                        <select
                            value={draft.sortBy}
                            onChange={(event) => {
                                setDraft((current) => ({
                                    ...current,
                                    sortBy: event.target.value as FilterState["sortBy"],
                                }))
                            }}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
                        >
                            <option value="createdAt">Newest</option>
                            <option value="title">Title</option>
                            <option value="company">Company</option>
                        </select>
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                        <span className="mb-1 block">Order</span>
                        <select
                            value={draft.order}
                            onChange={(event) => {
                                setDraft((current) => ({
                                    ...current,
                                    order: event.target.value as FilterState["order"],
                                }))
                            }}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    type="submit"
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                    Apply filters
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                    Reset
                </button>
            </div>
        </form>
    )
}
