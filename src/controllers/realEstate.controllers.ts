import { Request, Response } from 'express'
import { IRealEstate } from '../interfaces/realEstate.interface'
import createRealEstateService from '../services/realEstate/createRealEstate.service'
import listAllRealEstateService from '../services/realEstate/listAllRealEstate.service'

const createRealEstateController = async (req: Request, res: Response) => {
    const realEstateData: IRealEstate = req.body
    const newData = await createRealEstateService(realEstateData)

    return res.status(201).json(newData)
}

const listAllRealEstateController = async (req: Request, res: Response) => {
    const realEstate = await listAllRealEstateService()

    return res.json(realEstate)
}

export { createRealEstateController, listAllRealEstateController }
