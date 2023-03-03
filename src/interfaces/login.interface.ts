import { z } from 'zod'
import { createLoginSchema } from '../schemas/login.schema'

type ILogin = z.infer<typeof createLoginSchema>

export { ILogin }
