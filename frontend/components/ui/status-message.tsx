import { cn } from "@/lib/utils"

type StatusMessageProps = Readonly<{
    title: string
    message: string
    tone?: "error" | "info"
}>

export function StatusMessage({
    title,
    message,
    tone = "info",
}: StatusMessageProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border p-4 shadow-sm",
                tone === "error"
                    ? "border-red-200 bg-red-50 text-red-900"
                    : "border-slate-200 bg-white text-slate-900",
            )}
        >
            <h3 className="text-base font-semibold">{title}</h3>
            <p
                className={cn(
                    "mt-1 text-sm",
                    tone === "error" ? "text-red-700" : "text-slate-600",
                )}
            >
                {message}
            </p>
        </div>
    )
}
