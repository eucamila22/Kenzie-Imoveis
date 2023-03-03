import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategory, ICategoryRepo, IReturnCategory } from '../../interfaces/categories.interface'
import { returnCategorySchema } from '../../schemas/categories.schema'

const createCategoryService = async (userData: ICategory): Promise<IReturnCategory> => {
    const categoryRepository: ICategoryRepo = AppDataSource.getRepository(Category)

    const category: Category = categoryRepository.create(userData)

    await categoryRepository.save(category)

    const newCategory = returnCategorySchema.parse(category)

    return newCategory
}

export default createCategoryService
