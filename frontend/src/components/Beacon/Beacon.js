import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createModal, selectBeacon } from '../../redux/actions';
import './Beacon.css';
import DisplayBeaconInformation from '../modals/DisplayBeaconInformation/DisplayBeaconInformation';

class Beacon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.beacon,
      name: props.name,
      status: props.status,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.name !== state.name || props.status !== state.status) {
      return {
        name: props.name,
        status: props.status,
      };
    }
    return null;
  }

  handleClick = e => {
    e.preventDefault();

    this.props.selectBeacon(this.state.id);

    const modalId = 'DisplayBeaconInformation';
    this.props.createModal(modalId, <DisplayBeaconInformation />, true);
  }

  render() {
    return (
      <div className="Beacon" onClick={this.handleClick}>
        <div className="Beacon__text">
          <div className="Beacon__text__name">{ this.state.name }</div>
        </div>
        <div className={`Beacon__status Beacon__status--${this.state.status}`}>
          <div className="Beacon__status__icon"></div>
          <div className="Beacon__status__text">{ this.state.status }</div>
        </div>
        <div className="Beacon__icon-arrow"></div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const { beacon } = ownProps;
  const { name, status } = state.beacons.instances[beacon];
  return {
    name: name || '',
    status: status || '',
  };
};

const mapDispatchToProps = {
  createModal,
  selectBeacon,
};

export default connect(mapStateToProps, mapDispatchToProps)(Beacon);
