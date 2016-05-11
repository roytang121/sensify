
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

    this.nextItem = null;
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

    // properly set next song after set new playlist
    this.playlist = playlist;

    if (this.playlist != null) {
      if (this.currentItem != null) {
        this.updateNextItem();
      }
    }

    // append playerItems to queue
    // this.queue = this.playlist.playerItems.slice();
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

  play(playerItem) {
    console.log("trigger play");

    if (playerItem === null && this.currentItem != null) {
      this.player.play();
      this.updateNextItem();
      return;
    }

    if (this.playlist != null) {
      // pop one item from queue and play
      if (this.playlist.playerItems.length > 0) {
        // if (this.nextItem === null) {
        //   if (this.playlist.playerItems.length > 0) {
        //     this.currentItem = this.playlist.playerItems[0];
        //   } else {
        //     console.log("Playlist reached to end");
        //   }
        // } else {
        //   this.currentItem = nextItem;
        // }
        this.currentItem = playerItem;

        // query currentItem index and set nextItem
        if (this.currentItem != null) {
          this.updateNextItem();
        } else {
          console.debug("CurrentItem == null, unexpected");
          return;
        }

        this.playWithPlayerItem(this.currentItem);
        this.notify('playerItemDidChange');
        console.log("this.queue.length > 0");
      } else {
        console.log("this.queue.length < 0");
      }
    } else {
      console.error("this.playlist == nil");
    }
  }

  updateNextItem() {
    let index = this.playlist.playerItems.indexOfPlayerItem(this.currentItem);

    // happen when player is playing and user deleted the curreItem song
    if (index === -1 && this.currentItem != null && this.nextItem != null) {
        // deleted currentItem and updated
        return; // no need to change nextItem
    }

    if (index + 1 < this.playlist.playerItems.length) {
      this.nextItem = this.playlist.playerItems[index + 1];
    } else {
      this.nextItem = null;
    }
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
      console.log(this.currentItem);
      this.notify('playerItemDidChange');
    }
  }

  /** Videojs event **/
  videojsDidEnded() {
    console.debug("[videojs event] Ended");
    this.currentItem = this.nextItem;
    console.log(this.nextItem);
    this.play(this.currentItem); // default play to next item
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
