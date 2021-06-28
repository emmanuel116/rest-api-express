const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const notFoundHandler = require('./middleware/notFoundHandler')
const {
  logErrors,
  wrapError,
  errorHandler
} = require('./middleware/errorHandler')
const usersApi = require('./components/users')
const authApi = require('./components/auth')

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

module.exports = app
