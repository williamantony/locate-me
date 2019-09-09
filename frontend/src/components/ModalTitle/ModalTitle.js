import React from 'react';
import './ModalTitle.css';

const ModalTitle = ({ text = '', align = 'center' }) => {
  const className = `ModalTitle ModalTitle--align-${align}`;
  return (
    <div className={className}>
      <div className="ModalTitle__wrapper">
        <div className="ModalTitle__title">{ text }</div>
      </div>
    </div>
  );
};

export default ModalTitle;
