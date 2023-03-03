import 'express-async-errors'
import express, { Application } from 'express'
import { handleErrors } from './errors'
import useRoutes from './routers/user.routes'
import loginRoutes from './routers/login.routes'

const app: Application = express()
app.use(express.json())

app.use('/users', useRoutes)
app.use('/login', loginRoutes)

app.use(handleErrors)
export default app
