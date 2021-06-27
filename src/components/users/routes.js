import { Router } from 'express'
import passport from 'passport'
import '../../auth/jwt'
import validationHandler from '../../utils/middleware/validationHandler'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers'
import {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
} from './schema'

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

export default usersApi
