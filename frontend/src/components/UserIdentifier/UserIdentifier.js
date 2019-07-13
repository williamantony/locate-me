import React from 'react';
import uuid from 'uuid/v4';

const UserIdentifier = () => {
  const clientId = sessionStorage.getItem('client') || uuid();
  sessionStorage.setItem('client', clientId);
  
  return null;
};

export default UserIdentifier;
