import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions';
import './ModalInstance.css';

class ModalInstance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isVisible: false,
      content: props.content || null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modal.isVisible !== state.isVisible) {
      return {
        isVisible: props.modal.isVisible,
      };
    }
    return null;
  }

  hideModal = (e) => {
    e.preventDefault();
    this.props.hideModal(this.state.id);
  }

  render() {
    let modalClass = `ModalInstance`;
    modalClass = `${modalClass}${ this.state.isVisible ? ` ModalInstance--isVisible` : ``}`;

    return (
      <div className={modalClass}>
        <div className="ModalInstance__wrapper">
          <div className="ModalInstance__box">

            <div className="ModalInstance__header">
              <div className="ModalInstance__close-icon" onClick={this.hideModal}></div>
            </div>
            <div className="ModalInstance__body">
              {
                React.cloneElement(this.state.content, {
                  modalId: this.state.id,
                })
              }
            </div>

          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal.instances[ownProps.id],
  };
};

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
