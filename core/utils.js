const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config/config')

function generateToken(uid, scope) {
  let token = jwt.sign(
    // 保存在 token 中的数据
    { uid, scope },
    // 密匙
    secretKey,
    // 设置
    {
      expiresIn // 过期时间
    }
  )

  return token
}

exports.generateToken = generateToken