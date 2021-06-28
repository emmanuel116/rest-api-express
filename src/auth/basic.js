const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const usersService = require('../components/users/services')

passport.use(
  new BasicStrategy(async (user, password, cb) => {
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
