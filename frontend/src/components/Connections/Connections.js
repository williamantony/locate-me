import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createModal, getBeaconsList } from '../../redux/actions';
import './Connections.css';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';
import Button from '../Button/Button';
import AddNewBeacon from '../modals/AddNewBeacon/AddNewBeacon';
import BeaconsList from '../BeaconsList/BeaconsList';
import ConnectionTitle from '../ConnectionTitle/ConnectionTitle';

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.connectionName,
      beacons: props.beacons || [],
    };
    props.getBeaconsList();
  }

  handleClick = (e) => {
    e.preventDefault();

    const modalId = 'CreateNewBeaconModal';
    this.props.createModal(modalId, <AddNewBeacon />, true);
  }

  render() {
    if (this.state.connectionName === null) {
      return null;
    }

    return (
      <div className="Connections">
        <div className="Connections__wrapper">

          <ConnectionTitle text={this.state.name} />

          <BeaconsList />

          <ButtonsGroup style={{ justifyContent: 'flex-start', marginTop: '25px' }}>
            <Button text="Add a locator beacon" size="small" color="blue" theme="outlined" onClick={this.handleClick} />
          </ButtonsGroup>

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { currentConnection } = state.self;
  const connection = state.connections[currentConnection] || {  };
  return {
    connectionName: connection.name || null,
    beacons: connection.beacons,
  };
};

const mapDispatchToProps = {
  createModal,
  getBeaconsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
