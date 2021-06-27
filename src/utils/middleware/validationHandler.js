import { badRequest } from '@hapi/boom'
import { object } from 'joi'

const validate = (data, schema) => {
  const { error } = object(schema).validate(data)
  return error
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema)
    error ? next(badRequest(error)) : next()
  }
}

export default validationHandler
