import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { IUserRepo } from '../../interfaces/user.interface'

const deleteUserService = async (idUser: number): Promise<void> => {
    const userRepository: IUserRepo = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: idUser,
        },
    })

    await userRepository.softRemove(user!)
}

export default deleteUserService
