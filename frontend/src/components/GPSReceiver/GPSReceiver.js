import React from 'react';
import './GPSReceiver.css';
import SocketReceiver from '../SocketReceiver/SocketReceiver';
import MapInterface from '../MapInterface/MapInterface';
import withLocationTracker from '../LocationTracker/withLocationTracker';

const GPSReceiver = () => {
  return (
    <div className="GPSReceiver">
      <SocketReceiver />
      <MapInterface />
    </div>
  );
};

export default withLocationTracker(GPSReceiver);
