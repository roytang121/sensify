import React, {Component} from 'react'
import Home from './Home'
// import Footer from './Footer';
import Navbar from './Navbar';
import Foobar from './Foobar';


/** CSS **/
require('../stylesheets/main.less');
require('../stylesheets/style.less');
require('video.js/dist/video-js.css');

/** vendors **/
// var videojs = require('video.js');
require('jquery-ui/sortable');

require('toastr');

class App extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                {this.props.children}
            </div>
        );
    }
}

export default App;
