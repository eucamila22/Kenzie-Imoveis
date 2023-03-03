import { Router } from 'express'
import {
    createUserController,
    deleteUserController,
    listAllUserController,
    updateUserController,
} from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExists.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureLoggedUserValidateMiddleware from '../middlewares/ensureLoggedUserValidate.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import { userSchema, userUpdateSchema } from '../schemas/user.schema'

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
    ensureUserExistsMiddleware,
    ensureTokenIsValidMiddleware,
    ensureLoggedUserValidateMiddleware,
    ensureDataIsValidMiddleware(userUpdateSchema),
    updateUserController
)
useRoutes.delete(
    '/:id',
    ensureUserExistsMiddleware,
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    deleteUserController
)

export default useRoutes
