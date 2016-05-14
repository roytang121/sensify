import colors from 'colors'

module.exports = function(env) {
  console.log("Using " + "Config".green + " file with " + env.red);

  // docker environment
  if (process.env.DOCKER_IP) {
    console.log("Detected using docker environment: " + process.env.DOCKER_IP);
    return {
      rethinkdb_host: process.env.DOCKER_IP,
      rethinkdb_port: 28015,
      rethinkdb_dbname: 'dev_sensbify'
    }
  }

  if (env === 'production') {
    return {
      rethinkdb_host: "localhost",
      rethinkdb_port: process.env.RETHINKDB_PORT,
      rethinkdb_dbname: 'dev_sensbify'
    }
  } else {
    return {
      rethinkdb_host: '192.168.99.100',
      rethinkdb_port: 32775,
      rethinkdb_dbname: 'dev_sensbify'
    }
  }
}
