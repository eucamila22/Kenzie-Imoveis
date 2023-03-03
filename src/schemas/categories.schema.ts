import { z } from 'zod'

const categorySchema = z.object({
    name: z.string().min(3).max(45),
})

const returnCategorySchema = categorySchema.extend({
    id: z.number(),
})

const returnAllCategory = categorySchema.array()

export { categorySchema, returnAllCategory, returnCategorySchema }
