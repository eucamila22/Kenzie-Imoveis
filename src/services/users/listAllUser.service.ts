import { returnMultipleUserSchema } from '../../schemas/user.schema'
import { User } from '../../entities'
import { IUserRepo, IUsersReturn } from '../../interfaces/user.interface'
import { AppDataSource } from '../../data-source'

const listAllUserService = async (): Promise<IUsersReturn> => {
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const findUsers: Array<User> = await userRepository.find()

    const users = returnMultipleUserSchema.parse(findUsers)

    return users
}

export default listAllUserService
