import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MapInterface.css';
import MapEditor from '../MapEditor/MapEditor';

class MapInterface extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.mapElement = React.createRef();
    this.state = {
      location: null,
      mapLoaded: false,
      mapMarkerSet: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!!props.location.updatedAt) {
      return {
        location: props.location,
      };
    }
    return null;
  }

  componentDidMount() {
    const SI = setInterval(() => {

      const { location, mapLoaded } = this.state;

      if (!mapLoaded && !!location) {
        clearInterval(SI);
        this.createMap();
      }
    }, 250);
  }

  createMap() {

    global.initMap = () => {

      const { latLng } = this.state.location;

      this.map = new global.google.maps.Map(this.mapElement.current, {
        center: latLng,
        gestureHandling: 'greedy',
        zoom: 16,
        minZoom: 2,
        maxZoom: 25,
        zoomControl: true,
        zoomControlOptions: {
          position: global.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,

        restriction: {
          latLngBounds: {
            north: 80,
            south: -85,
            east: 180,
            west: -180,
          },
          strictBounds: true,
        },

        backgroundColor: '#ffffff',
        styles: [
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      });

      this.map.setCenter(latLng);

      global.google.maps.event.addListener(this.map, 'center_changed', () => {
        this.setState({
          mapMarkerSet: true,
        });
      });

      this.setState({
        mapLoaded: true,
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
      <div className="MapInterface">
        <div className="MapInterface__loader"></div>
        <div ref={this.mapElement} className="MapInterface__mapElement" data-maploaded={this.state.mapMarkerSet}></div>
        {
          this.state.mapLoaded &&
          <MapEditor map={this.map} />
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    location: state.self.location || {},
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MapInterface);
