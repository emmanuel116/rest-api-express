const usersService = require('./services')

const getUsers = async (req, res, next) => {
  const query = req.query
  try {
    const users = await usersService.getUsers(query)
    res.status(200).json({
      data: users,
      message: 'Users Listed'
    })
  } catch (err) {
    next(err)
  }
}

const getUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await usersService.getUserId({ userId })
    res.status(200).json({
      data: user,
      message: 'User Retrived'
    })
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
  const { body: user } = req
  try {
    const createCharacterId = await usersService.createUser({
      user
    })
    res.status(201).json({
      data: createCharacterId,
      message: 'Users Created'
    })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  const { body: user } = req
  const { userId } = req.params
  try {
    const updateCusomterId = await usersService.updateUser({
      user,
      userId
    })
    res.status(200).json({
      data: updateCusomterId,
      message: 'User Updated'
    })
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  const { userId } = req.params
  try {
    const deleteCusomterId = await usersService.deleteUser({
      userId
    })
    res.status(200).json({
      data: deleteCusomterId,
      message: 'User Deleted'
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
