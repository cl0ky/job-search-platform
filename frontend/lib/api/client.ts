import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export function getErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined

        return data?.message ?? error.message ?? "Something went wrong."
    }

    if (error instanceof Error) {
        return error.message
    }

    return "Something went wrong."
}
