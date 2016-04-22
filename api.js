import express from 'express';
const router = express.Router();
import rethink from './rethink';
import request from 'request';

/** api **/
var atob = require('atob');
var btoa = require('btoa');
var youtubedl = require('youtube-dl');

router.get('/youtubedl/', function (req, res, next) {
  var decoded = atob(req.query.encoded);

  if (decoded === null) {
    res.send({error: 'encoded url cannot be null'});
    return
  }

  youtubedl.getInfo(decoded, null, function (err, info) {
    if (err) {
      res.send({error: err});
    } else {
      res.send(
        {
          url: info.url,
          title: info.title,
          metadata: info
        }
      );
    }
  });
});

router.post('/updatePlaylist', (req, res, next) => {
  var identifier = req.body.identifier;
  var data = req.body.data;

  rethink.updatePlaylist(identifier, data, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    } else {
      res.send(result);
      return;
    }
  })
});

router.get('/getPlaylist/', (req, res, next) => {
  var identifier = req.query.identifier;
  rethink.getPlaylist(identifier, (err, result) => {
    if (err) {
      console.log(err.red);
      res.send(err);
      return;
    } else {
      res.send(result);
      return;
    }
  });
})

router.get('/ip', (req, res) => {
  request.get('http://bot.whatismyipaddress.com/', (error, response, body) => {
    res.send({response: response, body: body});
  })
})

module.exports = router;
