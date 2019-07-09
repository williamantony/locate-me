import React, { Component } from 'react';
import './LocationSummary.css';

class LocationSummary extends Component {
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
      <div className="LocationSummary">
        <div className="LocationSummary__row">
          <div className="LocationSummary__column">Town / City:</div>
          <div className="LocationSummary__column">Ann Arbor</div>
        </div>
        <div className="LocationSummary__row">
          <div className="LocationSummary__column">State / Province:</div>
          <div className="LocationSummary__column">Michigan</div>
        </div>
        <div className="LocationSummary__row">
          <div className="LocationSummary__column">Country:</div>
          <div className="LocationSummary__column">United States</div>
        </div>
        <div className="LocationSummary__row">
          <div className="LocationSummary__column">Distance from you:</div>
          <div className="LocationSummary__column">200 mi</div>
        </div>
        <div className="LocationSummary__row">
          <div className="LocationSummary__column">Latitute / Longitude:</div>
          <div className="LocationSummary__column">{this.state.coords.x} / {this.state.coords.y}</div>
        </div>
      </div>
    );
  }

}

export default LocationSummary;
