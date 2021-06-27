import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import notFoundHandler from './utils/middleware/notFoundHandler'
import {
  logErrors,
  wrapError,
  errorHandler,
} from './utils/middleware/errorHandler'
import usersApi from './components/users'
import authApi from './components/auth'

const app = express()

app.use('/api/public', express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(fileUpload())

authApi(app)

usersApi(app)

app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)

export default app
