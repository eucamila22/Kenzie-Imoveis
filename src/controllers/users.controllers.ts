import { Request, Response } from 'express'
import { IUser, IUserUpdate } from '../interfaces/user.interface'
import createUserService from '../services/users/createUser.service'
import listAllUserService from '../services/users/listAllUser.service'
import updateUserService from '../services/users/updateUser.service'

const createUserController = async (req: Request, res: Response) => {
    const userData: IUser = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listAllUserController = async (req: Request, res: Response) => {
    const users = await listAllUserService()

    return res.json(users)
}

const updateUserController = async (req: Request, res: Response) => {
    const userData: IUserUpdate = req.body
    const idUser = parseInt(req.params.id)

    const updatedUser = await updateUserService(userData, idUser)

    return res.json(updatedUser)
}

export { createUserController, listAllUserController, updateUserController }
