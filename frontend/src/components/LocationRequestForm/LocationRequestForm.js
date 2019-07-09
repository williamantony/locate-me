import React, { Component } from 'react';
import axios from 'axios';
import './LocationRequestForm.css';

class LocationRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = `William is requesting your location using LocateMe! https://localhost:3000/DAs145s`;
      // Send SMS as Request
      await axios.post('http://localhost:9090/text', {
        number: this.state.phoneNumber,
        message,
      });

      console.log('Success: SMS Sent');

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="LocationRequestForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="phonenumberinput" className="LocationRequestForm__label">Enter Phone Number</label><br/>
          <input className="LocationRequestForm__input" id="phonenumberinput" type="tel" placeholder="+1.888.888.8888" value={this.state.phoneNumber} onChange={this.handleInput} />
          <button className="LocationRequestForm__button" type="submit">Send Request</button>
        </form>
      </div>
    );
  }

}

export default LocationRequestForm;
