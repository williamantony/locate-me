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
    if (props.id !== state.id) {
      return {
        id: props.id,
        isVisible: props.isVisible,
        content: props.content,
      };
    }
    if (props.isVisible !== state.isVisible) {
      return {
        isVisible: props.isVisible,
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

    if (!this.state.content) return null;

    return (
      <div className={modalClass}>
        <div className="ModalInstance__bg" onClick={this.hideModal}></div>
        <div className="ModalInstance__box">

            <div className="ModalInstance__header">
              <div className="ModalInstance__close-icon" onClick={this.hideModal}>
                <div className="ModalInstance__close-icon__image"></div>
              </div>
            </div>
            <div className="ModalInstance__body">
              <div className="ModalInstance__body__content">
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
  const modal = state.modal.instances[ownProps.id];
  const { isVisible, content } = modal;
  return {
    isVisible,
    content,
  };
};

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
