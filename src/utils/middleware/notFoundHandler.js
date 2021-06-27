import { notFound } from '@hapi/boom'

const notFoundHandler = (req, res) => {
  const {
    output: { statusCode, payload }
  } = notFound()

  res.status(statusCode).json(payload)
}

export default notFoundHandler