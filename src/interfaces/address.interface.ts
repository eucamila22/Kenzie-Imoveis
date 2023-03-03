import { addressSchema, returnAddressSchema } from '../schemas/address.schema'
import { z } from 'zod'
import { Address } from '../entities'
import { Repository } from 'typeorm'

type IAddress = z.infer<typeof addressSchema>
type IAddressReturn = z.infer<typeof returnAddressSchema>
type IAddressRepo = Repository<Address>

export { IAddress, IAddressReturn, IAddressRepo }
