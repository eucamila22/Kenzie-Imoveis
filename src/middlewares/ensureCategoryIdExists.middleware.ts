import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Category } from '../entities'
import { AppError } from '../errors'
import { ICategoryRepo } from '../interfaces/categories.interface'

const ensureMovieExistsMiddleware = async (
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<void> => {
    const categoryRepository: ICategoryRepo = AppDataSource.getRepository(Category)
    const findCategory = await categoryRepository.findOne({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!findCategory) {
        throw new AppError('Category not found', 404)
    }

    return next()
}

export default ensureMovieExistsMiddleware
