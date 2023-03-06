import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Address } from '../entities'
import { AppError } from '../errors'

const ensureAddresIsUniqueMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const addressData: Address = req.body.address

    if (addressData) {
        const findAddress: Address | null = await addressRepository.findOne({
            where: {
                street: addressData.street,
                zipCode: addressData.zipCode,
                number: req.body.address?.number,
                city: addressData.city,
                state: addressData.state,
            },
        })

        if (findAddress !== null) {
            throw new AppError('Address already exists', 409)
        }
    }

    return next()
}

export default ensureAddresIsUniqueMiddleware
