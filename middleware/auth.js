const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const consola$1 = require('consola')
const { secretKey } = require('../config/config')
class Auth {

  constructor(level) {
    Auth.ADMIN = 9
    Auth.TOURIST = 3
    this.level = level
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, secretKey)

      return true
    } catch (e) {
      return false
    }
  }

  get middleware() {
    return (req, res, next) => {
      const token = basicAuth(req)
      let errMsg = 'token不合法'

      // token 不存在的情况
      if (!token || token.name === 'null') {
        res.send({ code: 400, message: errMsg, request: `${req.method} ${req.path}` })
        return
      }

      try {
        const decoded = jwt.verify(token.name, secretKey)

        if (decoded.scope < this.level) {
          errMsg = "权限不足"
          res.send({ code: 400, message: errMsg, request: `${req.method} ${req.path}` })

          return
        }
      } catch (e) {
        // 1. token 不合法
        // 2. token 合法，但已过期 e.name = tokenExpiredError
        if (e.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }

        res.send({ code: 400, message: errMsg, request: `${req.method} ${req.path}` })
        return
      }

      // token 合法
      next()
    }
  }
}

module.exports = Auth