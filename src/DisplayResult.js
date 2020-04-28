import React from 'react';

class DisplayResult extends React.Component {

  render(){
    debugger
    return(
      <div>
        <div style={this.props.showResponse ? {display: 'block'} : {display: 'none'} }>
          <h2>Response</h2>

          <p><b>Name</b>: <i>{this.props.name}</i></p>
          <p><b>Nasa JPL URL</b>: <i>{this.props.nasaJplUrl}</i></p>
          {this.props.isPotentiallyHazardousAsteroid}
        </div>
      </div>
    )
  }
}

export default DisplayResult;
