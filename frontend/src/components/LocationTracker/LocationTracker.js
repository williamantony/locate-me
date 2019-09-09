import React from 'react';
import { connect } from 'react-redux';
import { setClientLocation } from '../../redux/actions';

const LocationTracker = ({ setClientLocation }) => {

  const onSuccess = position => {
    const { latitude, longitude } = position.coords;

    const latLng = {
      lat: latitude,
      lng: longitude,
    };

    setClientLocation(latLng);
  };

  const onError = positionError => {
    // Implement Error
  };

  const positionOptions = {
    enableHighAccuracy: true,
  };

  global.navigator.geolocation.watchPosition(onSuccess, onError, positionOptions);

  return <React.Fragment />;

};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setClientLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationTracker);
