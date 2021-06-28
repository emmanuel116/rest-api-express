const { notFound } = require('@hapi/boom')

const notFoundHandler = (req, res) => {
  const {
    output: { statusCode, payload }
  } = notFound()

  res.status(statusCode).json(payload)
}

module.exports = notFoundHandler
