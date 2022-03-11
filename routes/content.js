const express = require('express')
const content = express.Router()
const consola$1 = require('consola')
const Auth = require('../middleware/auth')

content.post('/content', new Auth(9).middleware, (req, res) => {
  res.send('新增文章内容成功')
})

content.get('/content', (req, res) => {
  res.send('获取文章内容成功')
})

exports.content = content