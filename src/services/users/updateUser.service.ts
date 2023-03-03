import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { IUserRepo, IUserReturn, IUserUpdate } from '../../interfaces/user.interface'
import { returnUserSchema } from '../../schemas/user.schema'

const updateUserService = async (
    newUserData: IUserUpdate,
    idUser: number
): Promise<IUserReturn> => {
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const oldUserData = await userRepository.findOneBy({
        id: idUser,
    })

    const user = userRepository.create({
        ...oldUserData,
        ...newUserData,
    })

    await userRepository.save(user)

    const updatedUser = returnUserSchema.parse(user)

    return updatedUser
}

export default updateUserService
