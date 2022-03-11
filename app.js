const express = require('express')
const consola$1 = require('consola')
const cors = require('cors')
const { token } = require('./routes/token')
const { content } = require('./routes/content')

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(token)
app.use(content)

app.listen(3001, () => {
  consola$1.success('running at port 3001')
})