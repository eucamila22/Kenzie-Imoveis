import {
    addressSchema,
    realEstateSchema,
    returnRealEstateSchema,
} from '../schemas/realEstate.schema'
import { z } from 'zod'
import { Repository } from 'typeorm'
import { Address, RealEstate } from '../entities'

type IRealEstate = z.infer<typeof realEstateSchema>
type IReturnRealEstate = z.infer<typeof returnRealEstateSchema>
type IAddress = z.infer<typeof addressSchema>

type IRepoRealEstate = Repository<RealEstate>
type IRepoAddress = Repository<Address>

export { IRealEstate, IAddress, IReturnRealEstate, IRepoRealEstate, IRepoAddress }
