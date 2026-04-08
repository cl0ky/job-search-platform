import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"

import { QueryProvider } from "@/providers/query-provider"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Job Search Platform",
    template: "%s | Job Search Platform",
  },
  description:
    "Mini job search platform for the Peoplyee Fullstack Developer Technical Assessment.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-lg font-semibold text-slate-900">
                  Job Search Platform
                </Link>
                <p className="text-sm text-slate-600">
                  Next.js • TanStack Query • Tailwind CSS
                </p>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-600 sm:px-6 lg:px-8">
                Built for the Peoplyee Fullstack Developer Technical Assessment.
              </div>
            </footer>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
