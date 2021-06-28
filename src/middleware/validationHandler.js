const { badRequest } = require('@hapi/boom')
const { object } = require('joi')

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

module.exports = validationHandler
