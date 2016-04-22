import React from 'react';
import {Link} from 'react-router';
var fs = require('fs');
import ytdl from 'ytdl-core'
import Playlist from './Playlist';
import PlayerItem from './PlayerItem';
import PlayerItemView from './PlayerItemView';
var toastr = require('toastr');
var videojs = require('video.js/dist/video.min.js');
import PC from './PlayerController';

class Player extends React.Component {

  constructor(props) {
    super(props);

    var vid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    this.state = {
      url: 'https://www.youtube.com/watch?v=oEE0JaT-QVs',
      playlist: Playlist,
      cur: 0,
      vid: vid,
    }

    this.search = this.search.bind(this);
    this.onPlaylistChange = this.onPlaylistChange.bind(this);
    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
  }

  componentDidMount() {

    $('.sortable').sortable({
      update: (event, ui) => {
        toastr.info(ui.item.index())
      }
    });

    Playlist.listenToChange(this.onPlaylistChange);

    var video = videojs(this.state.vid);

    PC.listen(video);

    video.on('ended', () => {
      // go to next video
    });
  }

  componentWillUnmount() {
    Playlist.unlisten(this.onPlaylistChange);
  }

  /**
    Playlist onChange Delegate
  */
  onPlaylistChange(items) {
    this.setState({playlist: Playlist});
  }

  /** UI Actions **/

  search(val, cb) {
    let yt_link = val;
    var encoded = btoa(yt_link);

    $.ajax({ url: '/api/youtubedl/?encoded=' + encoded})
      .done( (data) => {

        if (data.error) {
          toastr.error("Error searching video");
          return;
        }

        var video = videojs(this.state.vid);

        // video.autoplay(true);

        video.src([
          { type: 'video/mp4', src: data.url }
        ]);

        console.log(data.url);

        // append original source to playerItem
        data.youtube_url = yt_link;

        Playlist.addPlayerItem(new PlayerItem(data));

        cb(true);
      });
  }

  onSearchForm() {
    console.log("SEARCH");
    this.search($('#search-form-input').val(), (done) => {
      $('#search-form-input').val("");
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.onSearchForm();
  }

  handlePlaylistClick() {
    PC.setPlaylist(this.state.playlist);
    PC.play();
  }

  render() {

    return (
      <div className="container">
        <div className="row col-md-12">
          <form ref='searchForm' className='navbar-form navbar-form-large navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group' id="search-form">
                <input id="search-form-input" type='text' className='form-control' placeholder="https://www.youtube.com/watch?v=YAyRYn-CjxY" />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.onSearchForm.bind(this)}><span className='glyphicon glyphicon-plus'></span></button>
              </span>
            </div>
          </form>
        </div>

        <div className="row col-md-12 top-buffer">
          <div className="video-box-container">
            <video
              id={this.state.vid}
              className="video-js vjs-default-skin video-box"
              height="300px"
              data-setup="{}"
              controls>
            </video>
          </div>
        </div>

        <div className="row col-md-12 top-buffer">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                Main Playlist
                <a style={{"margin-left": "16px", cursor: 'pointer'}} className="glyphicon glyphicon-play-circle" onClick={this.handlePlaylistClick.bind(this)} />
                <span className="label label-info text-right pull-right">{this.state.playlist.playerItems.length} songs</span>
              </h4>
            </div>
            <table className="table table-striped">
              <tbody className="sortable">
                {
                  this.state.playlist.playerItems.map(function(playerItem, index) {
                    return <tr><td><PlayerItemView data-index={""+index} playerItem={playerItem} /></td></tr>;
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* --- end container --- */}
      </div>
    )
  }
}

export default Player;
