import React from 'react';
import './ConnectionTitle.css';

const ConnectionTitle = ({ text = null }) => {
  return (
    <div className="ConnectionTitle">
      <div className="wrapper wrapper--max-width-480px">
        <div className="ConnectionTitle__text">{ text }</div>
      </div>
    </div>
  );
};

export default ConnectionTitle;
