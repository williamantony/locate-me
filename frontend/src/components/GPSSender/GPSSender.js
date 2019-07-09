import React, { Component } from 'react';
import './GPSSender.css';
import LocationAcceptanceForm from '../LocationAcceptanceForm/LocationAcceptanceForm';

class GPSSender extends Component {

  render() {
    return (
      <div className="GPSSender">
        <div className="wrapper">

          <LocationAcceptanceForm />

        </div>
      </div>
    );
  }

}

export default GPSSender;
