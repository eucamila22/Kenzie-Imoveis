import { Request, Response } from 'express'
import { createScheduleService } from '../services/schedules/createSchedules.service'
import listAllSchedulesService from '../services/schedules/listAllSchedules.service'

const createScheduleController = async (req: Request, res: Response) => {
    const scheduleData = req.body
    const userId = parseInt(req.user.id)
    const schedule = await createScheduleService(scheduleData, userId)

    return res.status(201).json(schedule)
}

const listAllSchedulesController = async (req: Request, res: Response) => {
    const idSchedule: number = parseInt(req.params.id)
    const scheduleRealEstate = await listAllSchedulesService(idSchedule)

    return res.json(...scheduleRealEstate)
}

export { createScheduleController, listAllSchedulesController }
