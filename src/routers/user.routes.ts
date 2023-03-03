import { Router } from 'express'
import {
    createUserController,
    listAllUserController,
    updateUserController,
} from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExists.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import { userSchema } from '../schemas/user.schema'

const useRoutes: Router = Router()

useRoutes.post(
    '',
    ensureEmailExistsMiddleware,
    ensureDataIsValidMiddleware(userSchema),
    createUserController
)
useRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listAllUserController)
useRoutes.patch(
    '/:id',
    ensureDataIsValidMiddleware(userSchema),
    ensureTokenIsValidMiddleware,
    ensureUserExistsMiddleware,
    updateUserController
)

export default useRoutes
