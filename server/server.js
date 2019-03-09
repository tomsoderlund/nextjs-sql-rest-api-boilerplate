require('dotenv').config()

const bodyParser = require('body-parser')
const glob = require('glob')
const next = require('next')
const server = require('express')()
const { Pool } = require('pg')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const routes = require('./routes')
const routerHandler = routes.getRequestHandler(app)

const { config } = require('../config/config')

app.prepare().then(() => {
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))
  // Parse application/json
  server.use(bodyParser.json())

  // Allows for cross origin domain request:
  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
  })

  // Postgres (pg)
  const pool = new Pool({ connectionString: config.databaseUrl })

  // REST API routes
  const rootPath = require('path').join(__dirname, '/..')
  glob.sync(rootPath + '/server/api/*.js').forEach(controllerPath => {
    if (!controllerPath.includes('.test.js')) require(controllerPath)(server, pool)
  })

  // Next.js page routes
  server.get('*', routerHandler)

  // Start server
  server.listen(config.serverPort, () => console.log(`${config.appName} running on http://localhost:${config.serverPort}/`))
})
