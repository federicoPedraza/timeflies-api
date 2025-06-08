const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const authHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secret)
    req.user = decoded
  } catch (err) {
    req.user = undefined
  }

  next()
}

module.exports = authHandler
