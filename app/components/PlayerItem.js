import uuid from '../utils/UUID';

Array.prototype.indexOfPlayerItem = function (playerItem) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].uuid === playerItem.uuid)
      return i;
  }
  return -1;
}

class PlayerItem {
  constructor(props) {

    // preview url
    this.url = props.url || null;

    // original src from (i.e. youtube url)
    this.youtube_url = props.youtube_url || null;

    this.title = props.title || "no-title";

    if(!props.uuid) {
      // assign uuid for row item
      this.uuid = uuid();
    } else {
      this.uuid = props.uuid;
    }

    // this.getPlayerItemPreviewURL = this.getPlayerItemPreviewURL.bind(this);
  }

  /**
    return a promise
  */
  getPlayerItemPreviewURL() {
    console.log("getPlayerItemPreviewURL");
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/api/youtubedl',
        data: {encoded: btoa(this.youtube_url)}
      }).done((response) => {

        // proxy by local server
        // solve youtube server ip tracking
        // resolve(response.url);
        let encoded = btoa(response.url);
        let proxy = "/api/proxy?encoded=" + encoded

        resolve(proxy);
      });
    }.bind(this));
  }

  toString() {
    return this.uuid;
  }
}

export default PlayerItem
