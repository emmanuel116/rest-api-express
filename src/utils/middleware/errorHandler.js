import boom from '@hapi/boom'
import { dev } from '../../config/index'
import chalk from 'chalk'

const withErrorStack = (error, stack) => {
  if (dev) {
    return { ...error, stack }
  }
  return error
}

export const logErrors = (err, req, res, next) => {
  console.log(chalk.red(err))
  next(err)
}

export const wrapError = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }
  next(err)
}

export const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload },
  } = err

  res.status(statusCode || 500)
  res.json(withErrorStack(payload, err.stack))
}

export default {
  logErrors,
  wrapError,
  errorHandler,
}
