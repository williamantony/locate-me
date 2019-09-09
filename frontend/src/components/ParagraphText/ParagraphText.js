import React from 'react';
import './ParagraphText.css';

const ParagraphText = ({ children, text = null, align = 'left', style = {} }) => {
  const className = `ParagraphText ParagraphText--align-${align}`;
  return (
    <p className={className} style={style}>
      { text || children }
    </p>
  );
};

export default ParagraphText;
