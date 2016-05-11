import React, { Component, PropTypes } from 'react';
import Playlist from './Playlist'
import PC from './PlayerController'

class PlayerItemView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    }
  }

  componentDidMount() {
      $('#' + 'delete-player-item-button' + this.props['data-index']).click((e) => {
      // generate delete call to Playlist instance
      Playlist.deletePlayerItem(this.props.playerItem);
    });


    PC.on('playerItemDidChange', () => {
      if (PC.currentItem.uuid == this.props.playerItem.uuid) {
        this.setState({ isPlaying: true });
      } else {
        this.setState({ isPlaying: false });
      }
    })
  }

  onPlayerItemClick(e) {
    e.preventDefault();
    PC.play(this.props.playerItem);
  }

  render() {
    let shouldShowNowPlaying = this.state.isPlaying;
    return (
      <div className="player-item-view">
        <a href="#" onClick={this.onPlayerItemClick.bind(this)}>
          {this.props['data-index']} - {this.props.playerItem.title}
        </a>

        {
          (()=> {
            if (shouldShowNowPlaying) {
              return <span className="now_playing"></span>
            }
          })()
        }

        <span id={'delete-player-item-button' + this.props['data-index']} className="player-item-view-display-on-hover
glyphicon glyphicon-remove red"></span>
        <span id={'play-button' + this.props['data-index']} className="player-item-view-display-on-hover glyphicon glyphicon-play"></span>
      </div>
    );
  }
}

export default PlayerItemView;
