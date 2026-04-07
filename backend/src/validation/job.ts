import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  company: z.string().min(1, 'Company is required').max(200),
  location: z.string().min(1, 'Location is required').max(200),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  description: z.string().min(1, 'Description is required').max(5000),
  tags: z.array(z.string().min(1).max(50)).default([]),
}).refine(
  (data) => {
    if (data.salaryMin != null && data.salaryMax != null) {
      return data.salaryMax >= data.salaryMin
    }
    return true
  },
  { message: 'salaryMax must be greater than or equal to salaryMin', path: ['salaryMax'] },
)

export const jobQuerySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['createdAt', 'title', 'company']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
})

export type CreateJobInput = z.infer<typeof createJobSchema>
export type JobQueryInput = z.infer<typeof jobQuerySchema>
