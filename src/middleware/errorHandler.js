const boom = require('@hapi/boom')
const { config } = require('../config/index')
const chalk = require('chalk')

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack }
  }
  return error
}

const logErrors = (err, req, res, next) => {
  console.log(chalk.red(err))
  next(err)
}

const wrapError = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode || 500)
  res.json(withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  wrapError,
  errorHandler
}
