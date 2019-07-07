import React, { Component } from 'react';
import './GPSReceiver.css';

class GPSReceiver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        x: 0,
        y: 0,
      },
      error: {
        code: '',
        message: '',
      },
    };
  }

  componentDidMount() {

    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        coords: {
          x: latitude,
          y: longitude,
        },
        error: {
          code: '',
          message: '',
        }
      })
    };

    const onError = (positionError) => {
      this.setState({
        error: {
          code: positionError.code,
          message: positionError.message,
        },
      });
    };

    const positionOptions = {
      enableHighAccuracy: true,
    };

    global.navigator.geolocation.watchPosition(onSuccess, onError, positionOptions);

  }

  render() {
    return (
      <div className="GPSReceiver">
        <div>X: { this.state.coords.x }</div>
        <div>Y: { this.state.coords.y }</div>
        <br/>
        <br/>
        <div>Code: { this.state.error.code }</div>
        <div>Message: { this.state.error.message }</div>
      </div>
    );
  }

}

export default GPSReceiver;
