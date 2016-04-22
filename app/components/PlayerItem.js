import uuid from '../utils/UUID';

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

    this.getPlayerItemPreviewURL = this.getPlayerItemPreviewURL.bind(this);
  }

  /**
    return a promise
  */
  getPlayerItemPreviewURL() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/api/youtubedl',
        data: {encoded: btoa(this.youtube_url)}
      }).done((response) => {

        resolve(response.url);
      });

    }.bind(this));
  }
}

export default PlayerItem
