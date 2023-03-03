import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const ensureTokenIsValidMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    let token = req.headers.authorization

    if (!token) {
        throw new AppError('Missing bearer token', 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if (error) {
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: decoded.sub,
            admin: decoded.admin,
        }

        return next()
    })
}

export default ensureTokenIsValidMiddleware
