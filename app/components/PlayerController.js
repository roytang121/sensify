
let instance = null;

class PlayerController {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.playlist = null;
    this.player = null;
    this.queue = null;
    this.currentItem = null;
    this.delegates = {
      playerItemDidChange: [],
      playerItemStateDidChange: []
    }
  }

  listen(player) {

    if (this.player != null) {
      this.reset();
    }

    if (player != null) {
      this.player = player
      this.setup();
    } else {
      console.error("Videojs cannot be null");
    }
  }

  unlisten(obj) {
    if (obj === player) {
      this.reset();
      console.debug("PlayerController reset");
    } else {
      console.debug("Videojs instance is not listening");
    }
  }

  setPlaylist(playlist) {
    this.playlist = playlist;

    // append playerItems to queue
    this.queue = this.playlist.playerItems.slice();
  }

  setPlaylistWithStartingItem(playlist, startingItem) {
    if (startingItem === null) {
      this.setPlaylist(playlist);
    } else {
      this.playlist = playlist;

      let index = this.playlist.playerItems.indexOf(startingItem);
      if (index === -1) {
        this.setPlaylist(playlist);
      } else {
        this.queue = this.playlist.playerItems.slice();
        this.queue.splice(0, index+1);
        console.log(index);
        console.log(this.queue);
      }
    }
  }

  /* Actions */
  setup() {
    console.debug("pc setup");
    if (this.player === null) {
      console.error("Videojs in PlayerController is null");
    } else {
      // delegates events
      this.player.on('ended', this.videojsDidEnded.bind(this));
      this.player.on('error', this.videojsDidError.bind(this));
      this.player.on('timeupdate', this.videojsDidTimeUpdate.bind(this));
    }
  }

  play() {
    console.log("trigger play");
    if (this.playlist != null) {
      // console.debug("pc play playlist from index 0");
      // this.playAtIndex(0);
      if (this.currentItem != null) {
        this.player.play();
        this.notify('playerItemDidChange');
      } else {
        // pop one item from queue and play
        if (this.queue.length > 0) {
          let item = this.queue.shift();
          this.currentItem = item;
          this.playWithPlayerItem(item);
          this.notify('playerItemDidChange');
          console.log("this.queue.length > 0");
        } else {
          console.log("this.queue.length < 0");
        }
      }
    } else {
      console.error("this.playlist == nil");
    }
  }

  insert(playerItem) {
    // if (playerItem != null ){
    //   this.playWithPlayerItem(playerItem);
    // }
  }

  pause() {
    console.debug("pc pause");
  }

  reset() {
    console.debug("pc reset");
  }

  playAtIndex(index, options) {
    if (index >= 0 && index < this.playlist.playerItems.length) {
      let playerItem = this.playlist.playerItems[index];
      playerItem.getPlayerItemPreviewURL()
        .then(function (src) {
          console.log(src);
          this.player.src([
            {type: 'video/mp4', src: src}
          ])
          this.player.play();
        }.bind(this));

      this.currentItem = playerItem;
      this.notify('playerItemDidChange');
    }
  }

  playWithPlayerItem(playerItem) {
    if (playerItem != null) {
      playerItem.getPlayerItemPreviewURL()
        .then((src) => {
          console.log(src);
          this.player.src([
            {type: 'video/mp4', src: src}
          ]);
          this.player.play();
        });

      this.currentItem = playerItem;
      this.notify('playerItemDidChange');

      // rebuild quene when play with item
      this.setPlaylistWithStartingItem(this.playlist, playerItem);
    }
  }

  /** Videojs event **/
  videojsDidEnded() {
    console.debug("[videojs event] Ended");
    this.currentItem = null;
    this.play(); // default play to next item
  }

  videojsDidTimeUpdate() {
  }

  videojsDidError() {
    console.debug("[videojs event] Error");
  }

  /** event delegates out **/
  on(event, cb) {
    if (event in this.delegates) {
      let da = this.delegates[event];
      da.push(cb);
    }
  }

  notify(event, args) {
    if (event in this.delegates) {
      let da = this.delegates[event];
      for (var cb of da) {
        cb(args);
      }
    }
  }
}

export default new PlayerController()
