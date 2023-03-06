import { Router } from 'express'
import { createRealEstateController, listAllRealEstateController } from '../controllers/realEstate.controllers'
import ensureAddresIsUniqueMiddleware from '../middlewares/ensureAddressIsUnique.middleware'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { realEstateSchema } from '../schemas/realEstate.schema'

const realEstateRoutes: Router = Router()

realEstateRoutes.post(
    '',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureAddresIsUniqueMiddleware,
    ensureDataIsValidMiddleware(realEstateSchema),
    createRealEstateController
)

realEstateRoutes.get('', listAllRealEstateController)

export default realEstateRoutes
