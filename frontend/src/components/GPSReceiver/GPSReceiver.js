import React, { Component } from 'react';
import io from 'socket.io-client';
import './GPSReceiver.css';
import LocationRequestForm from '../LocationRequestForm/LocationRequestForm';
import LocationSummary from '../LocationSummary/LocationSummary';

class GPSReceiver extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:5050', {
      path: '/location',
    });
  }

  render() {
    return (
      <div className="GPSReceiver">
        <div className="wrapper">

          <LocationRequestForm />
          <LocationSummary />
          
        </div>
      </div>
    );
  }

}

export default GPSReceiver;
