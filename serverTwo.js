const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
const corsOptions = {
  origin: 'http://localhost:3000',
}

const dist = path.join(__dirname, '/dist')
let hdrs = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
  'Access-Control-Allow-Headers':
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
}
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

app.get('/create-wallet', (req, res) => {
  res.sendFile(file, { headers: hdrs, lastModified: false, etag: false })
})
app.listen(port, () => {
  console.log('listening on', port)
})
