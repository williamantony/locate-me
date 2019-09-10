import {
  SET_CLIENT_INFO,
  SET_CLIENT_ID,
  SET_CLIENT_NAME,
  SET_CURRENT_CONNECTION,
} from '../actions';

const initialState = {
  clientId: null,
  name: null,
  status: null,
  socket: null,
  currentConnection: null,
  location: {
    latLng: {
      lat: 0,
      lng: 0,
    },
    updatedAt: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CLIENT_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case SET_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload.clientId,
      };

    case SET_CLIENT_NAME:
      return {
        ...state,
        name: action.payload.name,
      };

    case SET_CURRENT_CONNECTION:
      return {
        ...state,
        currentConnection: action.payload.connectionId,
      };

    default:
      return state;
  }
};
