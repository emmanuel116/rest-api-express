const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const usersService = require('../components/users/services')
const { config } = require('../config')

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
      try {
        const userLoged = await usersService.getUser({
          user: tokenPayload.user
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
