import React from 'react';
import { connect } from 'react-redux'; 
import { hideModal } from '../../redux/actions';
import './DialogBox.css';

const DialogBox = ({ modalId, content, actions, hideModal }) => (
  <div className="DialogBox">
    <div className="DialogBox__content">{content}</div>
    <div className="DialogBox__actions">
      {
        React.Children.map(actions.props.children, (button) => {
          if (button.props.type === 'hide') {
            const newProps = {
              onClick: (e) => {
                if (typeof button.props.onClick === 'function') {
                  button.props.onClick(e);
                }
                hideModal(modalId);
              },
            };
            return React.cloneElement(button, newProps);
          }
          return button;
        })
      }
    </div>
  </div>
);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);
