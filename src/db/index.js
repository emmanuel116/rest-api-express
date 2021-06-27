import mysql from 'mysql'
import config from '../config'

const pool = mysql.createPool({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  database: config.dbName,
  connectionLimit: 10,
  port: config.dbPort,
})

export const getAll = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, elements) => {
      if (error) {
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const get = (query, values) => {
  console.log(query, values)
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, element) => {
      if (error) {
        return reject(error)
      }
      return resolve(element[0])
    })
  })
}

export const post = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      if (error) {
        return reject(error)
      }
      return resolve(result.insertId)
    })
  })
}

export const put = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

export const deleted = (query, id) => {
  return new Promise((resolve, reject) => {
    pool.query(query, id, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve(id)
    })
  })
}
