const r =  require('rethinkdb');
const config = require('./config')(process.env.NODE_ENV || 'dev');
import colors from 'colors'
require('rethinkdb-init')(r);

/*
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let table_name = 'playlist_test'

class Rethink {
  constructor() {

    /** delegates must be defined here before listening **/
    this.delegates = {
      connection: [],
      playlistChanges: []
    }

    console.log("rethink connecting db: " + config.rethinkdb_dbname.red);
    // start rethink connection
    r.init({
      host: config.rethinkdb_host,
      port: config.rethinkdb_port,
      db: config.rethinkdb_dbname
    }, [
      {
        name: table_name,
        primaryKey: 'identifier'
      }
    ])
    .then(function (conn) {
      console.log("Rethinkdb running on ".green + config.rethinkdb_host + ':' + config.rethinkdb_port);
      this.conn = conn;

      // delegate connection event
      this.notify('connection');

      // rethinkdb changeFeeds
      r.table(table_name).changes().run(this.conn, (err, feed) => {
        if (err) {
          console.log(err.toString().red.bold);
        } else {
          feed.on('data', function (message) {
            if (!message.new_val || !message.old_val || !message ) return;

            if (message.new_val.identifier === message.old_val.identifier) {

              // notify event
              this.notify('playlistChanges', message.new_val)

              console.log(this.delegates);
            }
          }.bind(this));
        }
      });

    }.bind(this))

    .fail(function (err) {
      console.log(err.bold.red);
    }.bind(this));

    // function bindings
    this.updatePlaylist = this.updatePlaylist.bind(this);
  }

  /** Delegates **/
  on(event, cb) {
    if (event in this.delegates) {
      this.delegates[event].push(cb);
    }
  }

  notify(event, data) {
    if (event in this.delegates) {
      for (var cb of this.delegates[event]) {
        cb(data);
      }
    }
  }

  /* ------------ */
  /*    Actions   */
  /* ------------ */
  updatePlaylist(identifier, playlist, cb) {
    console.log("updatePlaylist".red.bold + " " + identifier.green.bold);

    if (playlist === null) {
      playlist = []
    }

    r.table(table_name).getAll(identifier, {index: "identifier"}).limit(1)
    .run(this.conn, (err, cursor) => {
      if (err) {
        console.log(err);
      } else {
        cursor.toArray().then((results) => {
          if (results.length >= 1) {
            // update
            const doc = results[0];
            console.log("identifier:" + identifier.green.bold + " found with id " + doc.identifier + ", updating document");

            console.log(playlist);
            r.table(table_name).get(doc.identifier).update({
              data: playlist || new Array(0)
            })
            .run(this.conn, (err, result) => {
              if (err) {
                console.log(err);
              }
              cb(err, result);
            });
          } else {
            // create
            console.log("identifier:" + identifier + "found, creating document");

            r.table(table_name).insert({
              identifier: identifier,
              data: playlist
            })
            .run(this.conn, (err, result) => {
              if (err) {
                console.log(err);
              }
              cb(err, result);
            });
          }
        })
      }
    })
  }

  getPlaylist(identifier, cb) {
    r.table(table_name).get(identifier).run(this.conn, (err, result) => {
      cb(err, result);
    })
  }
}

let _rethink = new Rethink();

export default _rethink;
