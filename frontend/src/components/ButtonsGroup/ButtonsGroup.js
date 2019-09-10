import React from 'react';
import './ButtonsGroup.css';

const ButtonsGroup = ({ children, style }) => {
  return (
    <div className="ButtonsGroup" style={style}>
      { children }
    </div>
  );
};

export default ButtonsGroup;
