import React from 'react';
import Socket from '../../Socket';
import { connect } from 'react-redux';
import { setBeaconLocation } from '../../redux/actions';

class SocketReceiver extends React.Component {
  constructor(props) {
    super(props);
    Socket.on('location-update', (data) => {
      const { beacon, location } = data;
      props.setBeaconLocation(beacon, location);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setBeaconLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketReceiver);
