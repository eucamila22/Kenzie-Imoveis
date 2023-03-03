import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

const ensureIsAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const admin: boolean = req.user.admin

    if (admin !== true) {
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}

export default ensureIsAdminMiddleware
