import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule, User } from '../../entities'
import { AppError } from '../../errors'
import { IRepoRealEstate } from '../../interfaces/realEstate.interface'
import { IcreateSchedule } from '../../interfaces/schedules.interface'
import { IUserRepo } from '../../interfaces/user.interface'

export const createScheduleService = async (scheduleData: IcreateSchedule, userId: number) => {
    const { date, hour, realEstateId } = scheduleData

    const realEstateRepository: IRepoRealEstate = AppDataSource.getRepository(RealEstate)

    const realEstate = await realEstateRepository.findOneBy({
        id: scheduleData.realEstateId,
    })

    if (!realEstate) {
        throw new AppError('RealEstate not found', 404)
    }

    const scheduleRepository = AppDataSource.getRepository(Schedule)

    const existingSchedule = await AppDataSource.getRepository(Schedule)
        .createQueryBuilder('schedule')
        .where('schedule.date = :date', { date })
        .andWhere('schedule.hour = :hour', { hour })
        .andWhere('schedule.realEstateId = :realEstateId', { realEstateId })
        .getOne()

    if (existingSchedule) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    const scheduledDate = new Date(date)
    const dayOfWeek = scheduledDate.getDay()

    if (dayOfWeek < 1 || dayOfWeek > 5) {
        throw new AppError('Invalid date, work days are monday to friday', 400)
    }

    if (parseInt(hour[0] + hour[1]) < 8 || parseInt(hour[0] + hour[1]) > 18) {
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
    }

    const userExistingSchedule = await AppDataSource.getRepository(Schedule)
        .createQueryBuilder('schedule')
        .where('schedule.date = :date', { date })
        .andWhere('schedule.hour = :hour', { hour })
        .andWhere('schedule.userId = :userId', { userId })
        .getOne()

    if (userExistingSchedule) {
        throw new AppError(
            'User schedule to this real estate at this date and time already exists',
            409
        )
    }

    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: userId,
    })

    const schedule = scheduleRepository.create({
        ...scheduleData,
        realEstate: realEstate!,
        user: user!,
    })

    await scheduleRepository.save(schedule)
}
