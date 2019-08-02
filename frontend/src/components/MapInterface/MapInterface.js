import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MapInterface.css';

class MapInterface extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.mapElement = React.createRef();
    this.state = {
      
    };
  }

  componentDidMount() {

    window.initMap = () => {

      this.map = new window.google.maps.Map(this.mapElement.current, {
        center: {lat: 0, lng: 0},
        zoom: 8,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });
    
    };

    const { REACT_APP_GOOGLE_MAPS_API } = process.env;

    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API}&callback=initMap`;

    document.documentElement.appendChild(scriptTag);

  }

  render() {
    return (
      <div ref={this.mapElement} className="MapInterface" />
    );
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MapInterface);
