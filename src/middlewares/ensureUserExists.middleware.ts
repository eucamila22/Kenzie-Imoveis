import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { AppError } from '../errors'
import { IUserRepo } from '../interfaces/user.interface'

const ensureUserExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOne({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!findUser) {
        throw new AppError('User not found', 404)
    }

    return next()
}

export default ensureUserExistsMiddleware
