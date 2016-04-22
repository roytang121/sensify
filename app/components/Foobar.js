import React, {Component} from 'react'

class Foobar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#player-progress-instance').slider({
    	formatter: function(value) {
    		return 'Current value: ' + value;
    	}
    });
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            {/* start row */}
            <div id="foobar-container">
                  {/* player control group */}
              <div className='btn-group' id='player-control' role='group'>
                <button type='button' className='btn btn-default'>
                  <span className="glyphicon glyphicon-step-backward"></span>
                </button>
                <button type='button' className='btn btn-default'>
                  <span className="glyphicon glyphicon-play"></span>
                </button>
                <button type='button' className='btn btn-default'>
                  <span className="glyphicon glyphicon-step-forward"></span>
                </button>
              </div>


              <div id="player-progress-wrapper">
                <input id="player-progress-instance" data-slider-id='player-progress-instance' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
              </div>

            </div>
            {/* end row */}
          </div>
        </div>
      </footer>
    )
  }
}

export default Foobar;
