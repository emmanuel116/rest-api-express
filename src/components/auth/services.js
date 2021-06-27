import { get } from '../../db'

class ApiKeysService {
  constructor() {
    this.collection = '`api-keys`'
  }
  async getApiKey({ token }) {
    const apiKey = await get(
      `SELECT * FROM ${this.collection} WHERE token = ? `,
      [token]
    )
    return apiKey
  }
}

export default ApiKeysService
