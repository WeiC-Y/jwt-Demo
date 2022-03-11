const express = require('express')
const consola$1 = require('consola')
const { generateToken } = require('../core/utils')
const Auth = require('../middleware/auth')
const token = express.Router()

const { users } = require('../data')

token.post('/token', (req, res) => {
  const { uname, pwd } = req.body
  const token = verifyaap(uname, parseInt(pwd))

  if (!token) {
    res.send({
      code: 400,
      message: '用户名或密码错误'
    })

    return
  }

  res.send({
    code: 200,
    token
  })
})

// 检测token有效性
token.post('/verify', (req, res) => {
  const token = req.body.token
  const isvalid = Auth.verifyToken(token)
  res.send({ isvalid })
})

function verifyaap(uname, pwd) {
  const index = users.findIndex(user => {
    return user.username === uname && user.password === pwd
  })

  const user = users[index]
  if (!user) {
    return
  }

  return generateToken(user.id, Auth.ADMIN)
}

exports.token = token