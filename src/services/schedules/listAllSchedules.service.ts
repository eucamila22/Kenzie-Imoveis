import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule } from '../../entities'
import { AppError } from '../../errors'
import { IAllSchedules } from '../../interfaces/schedules.interface'

const listAllSchedulesService = async (id: number): Promise<IAllSchedules> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const realEstateRepository = AppDataSource.getRepository(RealEstate)
    const findRealEstate = await realEstateRepository.findOne({
        where: {
            id: id,
        },
    })

    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404)
    }

    const findScheduleRealEstate: IAllSchedules = await scheduleRepository.find({
        where: {
            id: id,
        },
        relations: {
            realEstate: true,
        },
    })
    
    return findScheduleRealEstate
}

export default listAllSchedulesService
