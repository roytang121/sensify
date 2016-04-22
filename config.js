module.exports = function(env) {
  if (env === 'dev') {
    return {
      rethinkdb_host: '192.168.99.100',
      rethinkdb_port: 32769,
      rethinkdb_dbname: 'dev_sensbify'
    }
  } else if (env === 'prod') {
    return {
      
    }
  }
}
