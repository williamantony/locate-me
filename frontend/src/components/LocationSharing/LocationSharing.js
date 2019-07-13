import React, { Component } from 'react';
import io from 'socket.io-client';
import './LocationSharing.css';

class LocationSharing extends Component {
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

    this.socket = io('http://localhost:5050', {
      path: '/location',
    });

    // socket.on('connection', () => {
      
    // });

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

  componentDidUpdate() {
    this.socket.emit('location-coordinates', this.state.coords);
  }

  render() {
    return (
      <div className="LocationSharing">
        <div className="wrapper">

          <div className="LocationSharing__content">
            <div className="LocationSharing__text">Your location is being shared with William.</div>
            <button className="LocationSharing__button">Stop Share</button>
          </div>

        </div>
      </div>
    );
  }

}

export default LocationSharing;
