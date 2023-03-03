import { Request, Response } from 'express'
import { ICategory } from '../interfaces/categories.interface'
import createCategoryService from '../services/categories/createCategory.service'

const createCategoryController = async (req: Request, res: Response) => {
    const categoryData: ICategory = req.body

    const category = await createCategoryService(categoryData)

    return res.status(201).json(category)
}

export default createCategoryController
