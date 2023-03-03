import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

class AppError extends Error {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400) {
        super(message)
        this.statusCode = statusCode
    }
}

const handleErrors = (error: Error, req: Request, resp: Response, _: NextFunction) => {
    if (error instanceof AppError) {
        return resp.status(error.statusCode).json({
            message: error.message,
        })
    }

    if (error instanceof ZodError) {
        return resp.status(400).json({
            message: error.flatten().fieldErrors,
        })
    }

    console.log(error)
    return resp.status(500).json({
        message: 'Internal Server Error',
    })
}

export { AppError, handleErrors }
