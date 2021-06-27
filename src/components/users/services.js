import { getAll, get, post, put, deleted } from '../../db'
import queries from './queries'
import bcrypt from 'bcrypt'

class UsersService {
  constructor() {
    this.collection = 'users'
  }

  async getUsers() {
    const users = await getAll(queries.getAllUsers)
    return users || []
  }

  async getUser({ user }) {
    console.log(queries)
    const userFind = await get(queries.getUser, [user])
    return userFind
  }

  async getUserId({ userId }) {
    const user = await get(query.getUserById, [userId])
    return user
  }

  async createUser({ user }) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const createdUserId = await post(query.createUser, [
      user.user,
      user.name,
      hashedPassword,
      user.role,
    ])
    return createdUserId
  }

  async updateUser({ userId, user } = {}) {
    if (user.password === '') {
      user.password = null
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
    }
    const updateCusomterId = await put(queries.updateUser, [
      user.user,
      user.name,
      user.password,
      user.role,
      userId,
    ])
    return updateCusomterId
  }

  async deleteUser({ userId }) {
    const deleteCusomterId = await deleted(queries.deleteUser, [userId])
    return deleteCusomterId
  }
}

export default UsersService
