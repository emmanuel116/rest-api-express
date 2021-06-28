const joi = require('joi')

const userIdSchema = joi.number()
const userUserSchema = joi.string().max(50)
const userNameSchema = joi.string().max(100)
const userPasswordSchema = joi.string()
const userRoleSchema = joi.string()

const createUserSchema = {
  user: userUserSchema.required(),
  name: userNameSchema.required(),
  password: userPasswordSchema.required(),
  role: userRoleSchema.required()
}

const updateUserSchema = {
  user: userUserSchema,
  name: userNameSchema,
  password: joi.string().allow(''),
  role: userRoleSchema
}

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}
