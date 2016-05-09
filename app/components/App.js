import React, {Component} from 'react'
import Home from './Home'
// import Footer from './Footer';
import Navbar from './Navbar';
import Foobar from './Foobar';

// require('toastr');

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
