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
      const clientId = sessionStorage.getItem('client');

      const endpoint = 'http://localhost:5000/location/request';

      const request = {
        phone: this.state.phoneNumber,
        sender_id: clientId,
      };

      await axios.post(endpoint, request);

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
