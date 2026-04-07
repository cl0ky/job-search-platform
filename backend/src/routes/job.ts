import { Router } from 'express'
import * as jobController from '../controllers/job.js'

const router = Router()

router.post('/', jobController.createJob)
router.get('/', jobController.getJobs)
router.get('/:id', jobController.getJobById)

export default router
