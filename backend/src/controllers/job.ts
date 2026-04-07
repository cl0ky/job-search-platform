import type { Request, Response, NextFunction } from 'express'
import { createJobSchema, jobQuerySchema } from '../validation/job.js'
import * as jobService from '../services/job.js'
import { AppError } from '../middleware/error.js'

export async function createJob(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createJobSchema.parse(req.body)
    const job = await jobService.createJob(data)
    res.status(201).json(job)
  } catch (err) {
    next(err)
  }
}

export async function getJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const query = jobQuerySchema.parse(req.query)
    const result = await jobService.getJobs(query)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export async function getJobById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params['id']
    if (!id || Array.isArray(id)) {
      throw new AppError(400, 'Job ID is required')
    }
    const job = await jobService.getJobById(id)
    if (!job) {
      throw new AppError(404, 'Job not found')
    }
    res.json(job)
  } catch (err) {
    next(err)
  }
}
