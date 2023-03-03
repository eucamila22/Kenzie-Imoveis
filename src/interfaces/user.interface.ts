import { userSchema, returnUserSchema, returnMultipleUserSchema } from '../schemas/user.schema'
import { z } from 'zod'
import { User } from '../entities'
import { DeepPartial, Repository } from 'typeorm'

type IUser = z.infer<typeof userSchema>
type IUserReturn = z.infer<typeof returnUserSchema>
type IUsersReturn = z.infer<typeof returnMultipleUserSchema>
type IUserRepo = Repository<User>
type IUserUpdate = DeepPartial<IUser>

export { IUser, IUserReturn, IUserRepo, IUsersReturn, IUserUpdate }
