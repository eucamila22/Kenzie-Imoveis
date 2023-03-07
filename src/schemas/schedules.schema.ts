import { z } from 'zod'
import { returnRealEstateSchema } from './realEstate.schema'
import { returnUserSchema } from './user.schema'

const createScheduleSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
})

const returnScheduleSchema = z.object({
    id: z.number(),
    date: z.date().or(z.string()),
    hour: z.string(),
    realEstate: returnRealEstateSchema,
    user: returnUserSchema,
})

export { createScheduleSchema, returnScheduleSchema }
