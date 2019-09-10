import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBeaconsList } from '../../redux/actions';
import './BeaconsList.css';
import Beacon from '../Beacon/Beacon';

class BeaconsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beacons: props.beacons || [],
    };
    props.getBeaconsList();
  }

  static getDerivedStateFromProps(props, state) {
    if (Array.isArray(props.beacons)) {
      if (props.beacons.length !== state.beacons.length) {
        return {
          beacons: props.beacons,
        };
      }
    }
    return null;
  }

  render() {
    return (
      <div className="BeaconsList">
        {
          this.state.beacons.map(beacon => {
            return <Beacon key={beacon} beacon={beacon} />
          })
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  const connectionId = state.self.currentConnection;
  const { beacons } = state.connections[connectionId];
  return {
    beacons,
  };
};

const mapDispatchToProps = {
  getBeaconsList
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsList);
