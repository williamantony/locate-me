import React from 'react';
import './ContentWrapper.css';

const ContentWrapper = ({ maxWidth = 480, children }) => {
  return (
    <div className="ContentWrapper" style={{ maxWidth: `${maxWidth}px` }}>
      { children }
    </div>
  );
};

export default ContentWrapper;
