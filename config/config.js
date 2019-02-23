const appName = 'nextjs-sql-rest-api-boilerplate'
const serverPort = process.env.PORT || 3123

const completeConfig = {

  default: {
    appName,
    serverPort,
    databaseUrl: process.env.DATABASE_URL || `postgresql://localhost/${appName}`
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `https://nextjs-sql-rest-api.herokuapp.com/`
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}
