import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { AppError } from '../../errors'

const listAllSchedulesService = async (id: number): Promise<RealEstate> => {
    const realEstateRepository = AppDataSource.getRepository(RealEstate)
    const findRealEstate = await realEstateRepository.findOne({
        where: {
            id: id,
        },
    })

    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404)
    }

    const scheduleRealEstate = await realEstateRepository
        .createQueryBuilder('realEstate')
        .select(['realEstate', 'address', 'categories', 'schedule', 'users'])
        .innerJoin('realEstate.address', 'address')
        .innerJoin('realEstate.category', 'categories')
        .innerJoin('realEstate.schedules', 'schedule')
        .innerJoin('schedule.user', 'users')
        .where('realEstate.id = :id', { id })
        .getOne()

    return scheduleRealEstate!
}
export default listAllSchedulesService
