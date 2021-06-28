const mysql = require('mysql')
const { config } = require('../config')

const pool = mysql.createPool({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  database: config.dbName,
  connectionLimit: 10,
  port: config.dbPort
})

const getAll = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, elements) => {
      if (error) {
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

const get = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, element) => {
      if (error) {
        return reject(error)
      }
      return resolve(element[0])
    })
  })
}

const post = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, result) => {
      if (error) {
        return reject(error)
      }
      return resolve(result.insertId)
    })
  })
}

const put = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

const deleted = (query, id) => {
  return new Promise((resolve, reject) => {
    pool.query(query, id, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve(id)
    })
  })
}

module.exports = {
  getAll,
  get,
  post,
  put,
  deleted
}
