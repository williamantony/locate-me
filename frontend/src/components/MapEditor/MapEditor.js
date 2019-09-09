import React from 'react';
import { connect } from 'react-redux';

class MapEditor extends React.Component {
  constructor(props) {
    super(props);
    this.map = props.map;
    this.marker = {};
    this.bounds = new global.google.maps.LatLngBounds();
    this.isSetSelfBeacon = false;
  }

  componentDidUpdate() {
    this.setMyLocationMarker();

    this.props.beacons.forEach(beacon => {
      this.createMarker(beacon);
    });
  }

  setMyLocationMarker = () => {
    const myBeacon = {
      beaconId: 'SELF-BEACON',
      location: this.props.myLocation,
      status: 'active',
    };

    this.createMarker(myBeacon);

    if (!this.isSetSelfBeacon && !!myBeacon.location)
      this.map.setCenter(myBeacon.location.latLng);

    this.isSetSelfBeacon = true;
  }

  createMarker = beacon => {
    if (!beacon.location) {
      return null;
    }

    const markerId = beacon.beaconId;

    const { location, status } = beacon;
    const { latLng } = location;

    const isActive = status !== 'closed';

    if (!!this.marker[markerId]) {

      if (isActive) {
        this.marker[markerId].setVisible(true);
        this.marker[markerId].setPosition(latLng);
      } else {
        this.marker[markerId].setVisible(false);
      }

    } else {
      
      this.marker[markerId] = new global.google.maps.Marker({
        map: this.map,
        position: latLng,
        animation: global.google.maps.Animation.DROP,
      });

    }

  }

  addMarkerToBounds = marker => {
    this.bounds.extend(marker.getPosition());
    this.map.fitBounds(this.bounds);

    const zoom = this.map.getZoom();
    const maxZoom = (zoom > 16) ? 16 : (zoom - 1);
    this.map.setZoom(maxZoom);
  }

  render() {
    return null;
  }
}


const mapStateToProps = state => {
  const { currentConnection } = state.self;
  const connection = state.connections[currentConnection] || {};
  const connectedBeacons = connection.beacons || [];

  const beacons = connectedBeacons.map(beacon => state.beacons.instances[beacon]);

  return {
    beacons,
    myLocation: state.self.location,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MapEditor);
