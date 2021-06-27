import { config } from 'dotenv'

config()

export default {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
}
