import { z } from 'zod'
import { returnCategorySchema } from './categories.schema'

const addressSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(6).optional().nullable(),
    city: z.string().max(20),
    state: z.string().max(2),
})

const returnAddressSchema = addressSchema.extend({
    id: z.number(),
})

const realEstateSchema = z.object({
    value: z.number().or(z.string()),
    size: z.number().positive(),
    address: addressSchema,
    categoryId: z.number(),
})

const returnRealEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().optional().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    value: z.number().or(z.string()),
    size: z.number().positive(),
    address: returnAddressSchema,
    category: returnCategorySchema,
})

const returnAllRealEstateSchema = returnRealEstateSchema.partial().array()

export {
    addressSchema,
    realEstateSchema,
    returnRealEstateSchema,
    returnAddressSchema,
    returnAllRealEstateSchema,
}
