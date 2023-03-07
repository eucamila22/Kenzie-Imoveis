import { Request, Response } from 'express'
import { ICategory, ICategoryRealEstate } from '../interfaces/categories.interface'
import createCategoryService from '../services/categories/createCategory.service'
import listAllCategoriesService from '../services/categories/listAllCategories.service'
import listRealEstatesByCategoryService from '../services/categories/listRealEstatesByCategory.service'

const createCategoryController = async (req: Request, res: Response) => {
    const categoryData: ICategory = req.body
    const category = await createCategoryService(categoryData)

    return res.status(201).json(category)
}

const listAllCategoriesController = async (req: Request, res: Response) => {
    const categories = await listAllCategoriesService()

    return res.json(categories)
}

const listRealEstatesByCategoryController = async (req: Request, res: Response) => {
    const categoryId: number = parseInt(req.params.id)
    const realEstateByCategory: ICategoryRealEstate = await listRealEstatesByCategoryService(
        categoryId
    )

    return res.json(...realEstateByCategory)
}

export {
    createCategoryController,
    listAllCategoriesController,
    listRealEstatesByCategoryController,
}
