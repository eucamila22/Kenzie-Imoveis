import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

const ensureLoggedUserValidateMiddleware = async (
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<Response | void> => {
    const authenticatedUserId: string = req.user.id
    const userId: number = parseInt(req.params.id)
    const admin: boolean = req.user.admin

    if (admin === true) {
        return next()
    }

    if (admin === false) {
        if (parseInt(authenticatedUserId) !== userId) {
            throw new AppError('Insufficient permission', 403)
        }
    }

    return next()
}

export default ensureLoggedUserValidateMiddleware
