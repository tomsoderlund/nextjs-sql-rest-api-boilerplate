const appName = 'my-amazing-app'
const serverPort = process.env.PORT || 3123

const completeConfig = {

  default: {
    serverPort,
    databaseUrl: process.env.DATABASE_URL || `postgresql://localhost/${appName}`
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `https://${appName}.herokuapp.com/`
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}
