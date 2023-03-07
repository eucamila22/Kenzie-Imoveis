import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule, User } from '../../entities'
import { AppError } from '../../errors'
import { IRepoRealEstate } from '../../interfaces/realEstate.interface'
import { IcreateSchedule, IReturnSchedule } from '../../interfaces/schedules.interface'
import { IUserRepo } from '../../interfaces/user.interface'
import { returnScheduleSchema } from '../../schemas/schedules.schema'

export const createScheduleService = async (
    scheduleData: IcreateSchedule,
    userId: number
): Promise<IReturnSchedule> => {
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
        throw new AppError('Schedule to this real estate at this date and time already exists')
    }

    const scheduledDate = new Date(`${date}T${hour}:00`)
    const dayOfWeek = scheduledDate.getDay()
    const hourOfDay = scheduledDate.getHours()

    if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw new Error('Invalid date, work days are monday to friday')
    }

    if (hourOfDay < 8 || hourOfDay >= 18) {
        throw new Error('Invalid hour, available times are 8AM to 18PM')
    }

    const userExistingSchedule = await AppDataSource.getRepository(Schedule)
        .createQueryBuilder('schedule')
        .where('schedule.date = :date', { date })
        .andWhere('schedule.hour = :hour', { hour })
        .andWhere('schedule.userId = :userId', { userId })
        .getOne()

    if (userExistingSchedule) {
        throw new Error('User schedule to this real estate at this date and time already exists')
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

    const newSchedule = returnScheduleSchema.parse(schedule)

    return newSchedule
}
