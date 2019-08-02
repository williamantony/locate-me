import React from 'react';
import { connect } from 'react-redux';
import ModalInstance from './ModalInstance/ModalInstance';

const Modal = ({ modals, instances }) => {
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
  )
};

const mapStateToProps = state => {
  return state.modal;
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
