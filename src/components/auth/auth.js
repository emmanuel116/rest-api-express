const { config } = require('../../config')
const jwt = require('jsonwebtoken')
const { getApiKey } = require('./services')
const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
require('../../auth/basic')

const authApi = (app) => {
  const router = express.Router()
  app.use('/api/auth', router)

  router.post('/sing-in', async (req, res, next) => {
    const { apiKeyToken } = req.body
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'))
    }

    passport.authenticate('basic', (error, userLogin) => {
      try {
        if (error || !userLogin) {
          next(boom.unauthorized(error))
        }
        req.login(userLogin, { session: false }, async (error) => {
          if (error) {
            next(error)
          }
          const apiKey = await getApiKey({ token: apiKeyToken })

          if (!apiKey) {
            next(boom.unauthorized('apiKeyToken is required'))
          }

          const { id, name, user, role } = userLogin

          const payload = {
            sub: id,
            name,
            user,
            role
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '60m'
          })

          return res.status(200).json({ token, user: { id, name, user, role } })
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  })
}

module.exports = authApi
