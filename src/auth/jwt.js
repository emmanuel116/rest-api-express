import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from '@hapi/boom'
import UsersService from '../components/users/services'
import config from '../config'

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const usersService = new UsersService()
      try {
        const userLoged = await usersService.getUser({
          user: tokenPayload.user,
        })
        if (!userLoged) {
          return cb(boom.unauthorized(), false)
        }
        delete userLoged.password
        cb(null, { ...userLoged })
      } catch (error) {
        return cb(error, 'error on jwt')
      }
    }
  )
)
