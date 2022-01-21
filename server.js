const express = require('express')
const cors = require('cors')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
const dist = path.join(__dirname, '/dist')

app.use(express.static(dist))

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, '/index.html'))
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
})

app.listen(port, () => {
  console.log('listening on', port)
})
