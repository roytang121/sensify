import toastr from 'toastr';
import PlayerItem from './PlayerItem';
import Socket from './Socket'

let instance = null;
let socket = Socket.io

// this class is used in client side only

class Playlist {
  constructor() {
    console.log("Playlist constructor");

    if (!instance) {
      instance = this;
    }

    // properties
    this.delegates = [];
    this.playerItems = [];

    // get playlist copy from server
    $.ajax({
      type: 'GET',
      data: {identifier: "main"},
      url: '/api/getPlaylist/'
    })
    .done((newVal) => {
      /** repeat **/
      let newItems = []

      for (var _data of newVal.data) {
        // console.log(_data);
        let item = new PlayerItem(_data);
        newItems.push(item);
      }

      this.playerItems = newItems;

      // notify to delegates
      this.notify();
      /* ----- */
    })
    .fail((err) => {
      toastr.error('get playlist from datbase fail');
    })


    // listen to rethink db change feeds
    let socket = io.connect();
    socket.on('playlistChanges', (newVal) => {

      let newItems = []

      for (var _data of newVal.data) {
        // console.log(_data);addPlayerItem
        let item = new PlayerItem(_data);
        newItems.push(item);
      }

      this.playerItems = newItems;

      // notify to delegates
      this.notify();

    });

    return instance;
  }

  listenToChange(cb) {
    this.delegates.push(cb);
  }

  notify() {
    // notify to delegates
    for (var cb of this.delegates) {
      cb(this.playerItems);
    }
  }

  notifyDatabase() {
    // update database copies
    $.ajax({
      type: "POST",
      url: '/api/updatePlaylist/',
      data: {
        identifier: "main",
        data: this.playerItems
      }
    })
    .done((data) => {
      toastr.success('update database with success');
    })
    .fail((jqXhr) => {
      toastr.error('update datbase fail');
    })
  }

  unlisten(obj) {
    var index = this.delegates.indexOf(obj);
    this.delegates.splice(index, 1);
  }

  addPlayerItem(item) {
    this.playerItems.push(item);

    this.notify();
    this.notifyDatabase();
  }

  deletePlayerItem(item) {
    var index = this.playerItems.indexOf(item);
    this.playerItems.splice(index, 1);

    this.notify();
    this.notifyDatabase();
  }
}

export default new Playlist()
