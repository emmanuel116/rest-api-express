const { Router } = require('express')
const passport = require('passport')
const validationHandler = require('../../middleware/validationHandler')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('./controllers')
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('./schema')
require('../../auth/jwt')

const usersApi = (app) => {
  const router = Router()
  app.use('/api/users', router)

  router.get('/', passport.authenticate('jwt', { session: false }), getUsers)
  router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userId: userIdSchema }, 'params'),
    getUser
  )
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createUserSchema),
    createUser
  )
  router.put(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    updateUser
  )
  router.delete(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userId: userIdSchema }, 'params'),
    deleteUser
  )
}

module.exports = usersApi
