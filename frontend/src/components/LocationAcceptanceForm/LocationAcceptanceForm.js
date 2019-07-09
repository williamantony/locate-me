import React, { Component } from 'react';
import './LocationAcceptanceForm.css';

class LocationAcceptanceForm extends Component {

  render() {
    return (
      <div className="LocationAcceptanceForm">
        <div className="LocationAcceptanceForm__question">
          William is requesting your location.<br/>
          Do you want to share your location with William ?
        </div>
        <div className="LocationAcceptanceForm__buttons">
          <button className="button button--red">Deny</button>
          <button className="button button--green">Accept</button>
        </div>
      </div>
    );
  }

}

export default LocationAcceptanceForm;
