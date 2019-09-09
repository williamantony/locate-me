import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Modal.css';
import ModalInstance from './ModalInstance/ModalInstance';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: [],
      instances: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modals.length !== state.modals.length) {
      return {
        modals: props.modals,
        instances: props.instances,
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.modals.length !== this.state.modals.length)
      return true;
    return false;
  }

  render() {
    const {
      modals,
      instances,
    } = this.state;

    return (
      <div className="Modal">
        {
          modals.map((modal, index) => {
            return (
              <ModalInstance key={index} id={modal} content={instances[modal].content} />
            );
          })
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  const { instances } = state.modal;
  return {
    instances,
    modals: Object.keys(instances),
  };
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
