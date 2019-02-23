const { routes: { createSqlRestRoutes } } = require('sql-wizard')

module.exports = (server, pool) => {
  createSqlRestRoutes(server, pool, '/api/kittens', 'kitten', { /* place custom handlers here */ })
}
