import { Repository } from 'typeorm'
import { z } from 'zod'
import { Schedule } from '../entities'
import { createScheduleSchema, returnScheduleSchema } from '../schemas/schedules.schema'

type IcreateSchedule = z.infer<typeof createScheduleSchema>
type IReturnSchedule = z.infer<typeof returnScheduleSchema>

type IAllSchedules = Array<Schedule>
type IScheduleRepo = Repository<Schedule>

export { IcreateSchedule, IReturnSchedule, IAllSchedules, IScheduleRepo }
