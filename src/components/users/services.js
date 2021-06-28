const { getAll, get, post, put, deleted } = require('../../db')
const queries = require('./queries')
const bcrypt = require('bcrypt')

const getUsers = async () => {
  const users = await getAll(queries.getAllUsers)
  return users || []
}

const getUser = async ({ user }) => {
  console.log(queries)
  const userFind = await get(queries.getUser, [user])
  return userFind
}

const getUserId = async ({ userId }) => {
  const user = await get(queries.getUserById, [userId])
  return user
}

const createUser = async ({ user }) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const createdUserId = await post(queries.createUser, [
    user.user,
    user.name,
    hashedPassword,
    user.role
  ])
  return createdUserId
}

const updateUser = async ({ userId, user } = {}) => {
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
    userId
  ])
  return updateCusomterId
}

const deleteUser = async ({ userId }) => {
  const deleteCusomterId = await deleted(queries.deleteUser, [userId])
  return deleteCusomterId
}

module.exports = {
  getUsers,
  getUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser
}
