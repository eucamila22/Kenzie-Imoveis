import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import { AppError } from '../../errors'
import { IRealEstate, IReturnRealEstate } from '../../interfaces/realEstate.interface'
import { returnRealEstateSchema } from '../../schemas/realEstate.schema'

const createRealEstateService = async (realEstateData: IRealEstate): Promise<IReturnRealEstate> => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    
    const address: Address = addressRepository.create(realEstateData.address)
    await addressRepository.save(address)
    
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const categoryFind = await categoryRepository.findOneBy({
        id: realEstateData.categoryId,
    })

    if (!categoryFind) {
        throw new AppError('Category not found', 404)
    }

    const realEstate: RealEstate = realEstateRepository.create({
        ...realEstateData,
        address: address,
        category: categoryFind,
    })

    await realEstateRepository.save(realEstate)
    const newData = returnRealEstateSchema.parse(realEstate)

    return newData
}

export default createRealEstateService
