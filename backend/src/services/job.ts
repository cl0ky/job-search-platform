import { prisma } from '../prisma/client.js'
import type { CreateJobInput, JobQueryInput } from '../validation/job.js'

export async function createJob(input: CreateJobInput) {
  return prisma.job.create({
    data: {
      title: input.title,
      company: input.company,
      location: input.location,
      salaryMin: input.salaryMin ?? null,
      salaryMax: input.salaryMax ?? null,
      description: input.description,
      tags: input.tags,
    },
  })
}

export async function getJobById(id: string) {
  return prisma.job.findUnique({ where: { id } })
}

type JobWhere = NonNullable<NonNullable<Parameters<typeof prisma.job.findMany>[0]>['where']>

export async function getJobs(query: JobQueryInput) {
  const { search, location, tag, page, limit, sortBy, order } = query
  const skip = (page - 1) * limit

  const conditions: JobWhere[] = []

  if (search) {
    conditions.push({
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    })
  }

  if (location) {
    conditions.push({ location: { contains: location, mode: 'insensitive' } })
  }

  if (tag) {
    conditions.push({ tags: { has: tag } })
  }

  const where: JobWhere = conditions.length > 0 ? { AND: conditions } : {}

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip,
      take: limit,
    }),
    prisma.job.count({ where }),
  ])

  return {
    data: jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}
