import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoryRepo, IReturnAllCategory } from '../../interfaces/categories.interface'
import { returnAllCategory } from '../../schemas/categories.schema'

const listAllCategoriesService = async (): Promise<IReturnAllCategory> => {
    const categoryRepository: ICategoryRepo = AppDataSource.getRepository(Category)
    const findCategory: Array<Category> = await categoryRepository.find()
    const categories = returnAllCategory.parse(findCategory)

    return categories
}

export default listAllCategoriesService
