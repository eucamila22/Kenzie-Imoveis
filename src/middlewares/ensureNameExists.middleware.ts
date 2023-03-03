import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Category, User } from '../entities'
import { AppError } from '../errors'
import { ICategoryRepo } from '../interfaces/categories.interface'
import { IUserRepo } from '../interfaces/user.interface'

const ensureNameExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const categoryRepository: ICategoryRepo = AppDataSource.getRepository(Category)
    const nameCategory = req.body.name
    const findNamecategory = await categoryRepository.findOne({
        where: {
            name: nameCategory,
        },
    })

    if (!Object.keys(req.body).includes('name')) {
        return next()
    }

    if (findNamecategory) {
        throw new AppError('Category already exists', 409)
    }

    return next()
}

export default ensureNameExistsMiddleware
