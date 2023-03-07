import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoryRealEstate } from '../../interfaces/categories.interface'

const listRealEstatesByCategoryService = async (
    categoryId: number
): Promise<ICategoryRealEstate> => {
    const categoryRepository = AppDataSource.getRepository(Category)

    const realEstateCategory: ICategoryRealEstate = await categoryRepository.find({
        where: {
            id: categoryId,
        },
        relations: {
            realEstate: true,
        },
    })

    return realEstateCategory
}

export default listRealEstatesByCategoryService
