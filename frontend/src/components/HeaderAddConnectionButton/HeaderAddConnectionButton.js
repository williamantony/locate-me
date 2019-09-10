import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createModal, getConnections } from '../../redux/actions';
import './HeaderAddConnectionButton.css';
import DisplayConnections from '../modals/DisplayConnections/DisplayConnections';

class HeaderAddConnectionButton extends Component {

  handleClick = (e) => {
    e.preventDefault();
    const modalId = 'ShowConnectionsModal';
    this.props.createModal(modalId, <DisplayConnections />, true);
  }

  render() {
    return (
      <div className="HeaderAddConnectionButton" onClick={this.handleClick}>
        <div className="HeaderAddConnectionButton__icon"></div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  createModal,
  getConnections,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAddConnectionButton);
