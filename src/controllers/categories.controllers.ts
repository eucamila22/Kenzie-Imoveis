import { Request, Response } from 'express'

import { ICategory } from '../interfaces/categories.interface'
import createCategoryService from '../services/categories/createCategory.service'
import listAllCategoriesService from '../services/categories/listAllCategories.service'

const createCategoryController = async (req: Request, res: Response) => {
    const categoryData: ICategory = req.body

    const category = await createCategoryService(categoryData)

    return res.status(201).json(category)
}

const listAllCategoriesController = async (req: Request, res: Response) => {
    const categories = await listAllCategoriesService()

    return res.json(categories)
}

export { createCategoryController, listAllCategoriesController }
