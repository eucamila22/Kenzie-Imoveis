import { Repository } from 'typeorm'
import { z } from 'zod'
import { Category } from '../entities'
import {
    categorySchema,
    returnAllCategory,
    returnCategorySchema,
} from '../schemas/categories.schema'

type ICategory = z.infer<typeof categorySchema>
type IReturnCategory = z.infer<typeof returnCategorySchema>
type IReturnAllCategory = z.infer<typeof returnAllCategory>
type ICategoryRepo = Repository<Category>
type ICategoryRealEstate = Array<Category>

export { ICategoryRepo, ICategory, IReturnAllCategory, IReturnCategory, ICategoryRealEstate }
