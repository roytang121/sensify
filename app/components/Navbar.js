import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import Socket from './Socket';
import Playlist from './Playlist';
import PlayerItem from './PlayerItem';
var toastr = require('toastr');

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = NavbarStore.getState();
        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        NavbarStore.listen(this.onChange);

        Socket.io.on('onlineUsers', (data) => {
            NavbarActions.updateOnlineUsers(data);
        });

        $(document).ajaxStart(() => {
            NavbarActions.updateAjaxAnimation('fadeIn');
        });

        $(document).ajaxComplete(() => {
            setTimeout(() => {
                NavbarActions.updateAjaxAnimation('fadeOut');
            }, 750);
        });
    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        // let searchQuery = this.state.searchQuery.trim();
        //
        // if (searchQuery) {
        //     NavbarActions.findCharacter({
        //         searchQuery: searchQuery,
        //         searchForm: this.refs.searchForm,
        //         history: this.props.history
        //     });
        // }
        console.log("SEARCH");
        this.search($('#search-form-input').val(), (done) => {
          $('#search-form-input').val("");
        });
    }

    search(val, cb) {
      let yt_link = val;
      var encoded = btoa(yt_link);

      $.ajax({ url: '/api/youtubedl/?encoded=' + encoded})
        .done( (data) => {

          if (data.error) {
            toastr.error("Error searching video");
            return;
          }

          // var video = videojs(this.state.vid);

          // video.autoplay(true);

          // video.src([
          //   { type: 'video/mp4', src: data.url }
          // ]);

          console.log(data.url);

          // append original source to playerItem
          data.youtube_url = yt_link;

          Playlist.addPlayerItem(new PlayerItem(data));

          cb(true);
        });
    }

    render() {
      return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link to='/' className='navbar-brand'>
                        <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
                          <div className='tri invert'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                        </span>
                        SENSBEAT
                        <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
                    </Link>
                </div>
                <div id='navbar' className='navbar-collapse collapse'>
                    <form ref='searchForm' className='navbar-form navbar-form-large navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
                        <div className='input-group'>
                            <input type='text' id="search-form-input" className='form-control nav-bar-search' placeholder="https://www.youtube.com/watch?v=YAyRYn-CjxY" value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
                          <span className='input-group-btn'>
                            <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-plus'></span></button>
                          </span>
                        </div>
                    </form>
                    <ul className='nav navbar-nav'>
                        <li><Link to='/player'>Player</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
