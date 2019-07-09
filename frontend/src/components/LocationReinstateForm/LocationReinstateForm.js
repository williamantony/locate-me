import React, { Component } from 'react';
import './LocationReinstateForm.css';

class LocationReinstateForm extends Component {

  render() {
    return (
      <div className="LocationReinstateForm">
        <div className="wrapper">
          <div className="LocationReinstateForm__content">
            <div className="LocationReinstateForm__question">
              You have denied William’s request to share your location.<br/>
              To share your location, click ‘Accept’.
            </div>
            <div className="LocationReinstateForm__buttons">
              <button className="button button--green">Accept</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default LocationReinstateForm;
