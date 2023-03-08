import { Router } from 'express'
import {
    createScheduleController,
    listAllSchedulesController,
} from '../controllers/schedules.controller'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import { createScheduleSchema } from '../schemas/schedules.schema'

const schedulesRoutes: Router = Router()

schedulesRoutes.post(
    '',
    ensureTokenIsValidMiddleware,
    ensureUserExistsMiddleware,
    ensureDataIsValidMiddleware(createScheduleSchema),
    createScheduleController
)

schedulesRoutes.get(
    '/realEstate/:id',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    listAllSchedulesController
)

export default schedulesRoutes
