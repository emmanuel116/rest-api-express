import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import UsersService from '../components/users/services'

passport.use(
  new BasicStrategy(async (user, password, cb) => {
    const usersService = new UsersService()

    try {
      const userLoged = await usersService.getUser({ user })
      if (!userLoged) {
        return cb(boom.unauthorized(), false)
      }
      if (!(await bcrypt.compare(password, userLoged.password))) {
        return cb(boom.unauthorized(), false)
      }

      delete userLoged.password

      return cb(null, userLoged)
    } catch (error) {
      cb(error, 'error basic')
    }
  })
)
