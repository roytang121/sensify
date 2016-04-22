import colors from 'colors'

module.exports = function(env) {
  console.log("Using " + "Config".green + " file with " + env.red);
  if (env === 'dev') {
    return {
      rethinkdb_host: '192.168.99.100',
      rethinkdb_port: 32769,
      rethinkdb_dbname: 'dev_sensbify'
    }
  } else if (env === 'prod') {
    return {
      rethinkdb_host: '192.168.99.100',
      rethinkdb_port: 32769,
      rethinkdb_dbname: 'prod_sensbify'
    }
  }
}
