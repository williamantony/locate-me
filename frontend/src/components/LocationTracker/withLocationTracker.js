import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createModal } from '../../redux/actions';
import LocationTracker from './LocationTracker';
import LocationPermissionModal from '../modals/LocationPermissionModal/LocationPermissionModal';

const withLocationTracker = ChildComponent => {
  class LocationPermission extends Component {
    constructor(props) {
      super(props);
      const permission = localStorage.getItem('permission');
      this.state = {
        hasPermission: permission === 'accepted' || false,
      };
    }

    componentDidMount() {
      if (!this.state.hasPermission) {
        const modalId = 'LocationPermissionModal';
        this.props.createModal(modalId, <LocationPermissionModal acceptPermission={this.acceptPermission} />, true);
      }
    }

    acceptPermission = () => {
      localStorage.setItem('permission', 'accepted');
      this.setState({
        hasPermission: true,
      });
    }

    render() {
      if (!this.state.hasPermission) {
        return null;
      }

      return (
        <React.Fragment>
          <LocationTracker />
          <ChildComponent />
        </React.Fragment>
      );
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(LocationPermission);
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  createModal,
};

export default withLocationTracker;