import express from 'express'
import passport from 'passport'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import ApiKeysService from './services'
import config from '../../config'
import '../../auth/basic'

const authApi = (app) => {
  const router = express.Router()
  app.use('/api/auth', router)

  const apiKeysService = new ApiKeysService()

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
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

          if (!apiKey) {
            next(boom.unauthorized('apiKeyToken is required'))
          }

          const { id, name, user, role } = userLogin

          const payload = {
            sub: id,
            name,
            user,
            role,
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '60m',
          })

          return res.status(200).json({ token, user: { id, name, user, role } })
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  })
}

export default authApi
