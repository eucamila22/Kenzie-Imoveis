import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { returnAllRealEstateSchema } from '../../schemas/realEstate.schema'

const listAllRealEstateService = async () => {
    const realEstateRepository = AppDataSource.getRepository(RealEstate)
    const findRealEstates: Array<RealEstate> = await realEstateRepository.find({
        relations: {
            address: true,
        },
    })
    const realEstate = returnAllRealEstateSchema.parse(findRealEstates)

    return realEstate
}

export default listAllRealEstateService
