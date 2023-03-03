import { AppDataSource } from '../../data-source'
import { User } from '../../entities/user.entity'
import { returnUserSchema } from '../../schemas/user.schema'
import { IUser, IUserRepo, IUserReturn } from '../../interfaces/user.interface'

const createUserService = async (userData: IUser): Promise<IUserReturn> => {
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const user: User = userRepository.create(userData)

    await userRepository.save(user)

    const newUser = returnUserSchema.parse(user)

    return newUser
}

export default createUserService
