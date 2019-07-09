import React, { Component } from 'react';
import './GPSReceiver.css';
import LocationRequestForm from '../LocationRequestForm/LocationRequestForm';
import LocationSummary from '../LocationSummary/LocationSummary';

class GPSReceiver extends Component {
  

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
