const { get } = require('../../db')

const apiKeys = '`api-keys`'

const getApiKey = async ({ token }) => {
  const apiKey = await get(
      `SELECT * FROM ${apiKeys} WHERE token = ? `,
      [token]
  )
  return apiKey
}

module.exports = {
  getApiKey
}
