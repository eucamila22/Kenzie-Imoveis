import { Router } from 'express'
import {
    createCategoryController,
    listAllCategoriesController,
    listRealEstatesByCategoryController,
} from '../controllers/categories.controllers'
import ensureCategoryExistsMiddleware from '../middlewares/ensureCategoryIdExists.middleware'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureNameExistsMiddleware from '../middlewares/ensureNameExists.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { categorySchema } from '../schemas/categories.schema'

const categoriesRoutes: Router = Router()

categoriesRoutes.post(
    '',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureDataIsValidMiddleware(categorySchema),
    ensureNameExistsMiddleware,
    createCategoryController
)

categoriesRoutes.get('', listAllCategoriesController)

categoriesRoutes.get(
    '/:id/realEstate',
    ensureCategoryExistsMiddleware,
    listRealEstatesByCategoryController
)

export default categoriesRoutes
