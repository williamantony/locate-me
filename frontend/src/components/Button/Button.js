import React from 'react';
import './Button.css';

const Button = ({
  text = '',
  size = 'medium',
  color = 'default',
  theme = 'outlined',
  onClick = (() => {}),
}) => {

  const buttonClassName = `Button 
      Button--size-${size.toLowerCase()} 
      Button--color-${color.toLowerCase()} 
      Button--theme-${theme.toLowerCase()}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      <div className="Button__text">{ text }</div>
    </button>
  );
};

export default Button;
