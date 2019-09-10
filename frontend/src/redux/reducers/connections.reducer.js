import {
  GET_CONNECTIONS,
  GET_CONNECTED_BEACONS,
  CREATE_CONNECTION,
  ADD_BEACON_TO_CONNECTION,
} from '../actions';

const initalState = {

};

export default (state = initalState, action) => {
  switch (action.type) {

    case CREATE_CONNECTION:
      return {
        ...state,
        [action.payload.connectionId]: {
          name: '',
          status: action.payload.status,
          beacons: [],
        },
      };

    case GET_CONNECTIONS:
      return {
        ...state,
        ...action.payload.connections,
      };

    case GET_CONNECTED_BEACONS:
      return {
        ...state,
        [action.payload.connectionId]: {
          ...state[action.payload.connectionId],
          beacons: action.payload.beacons,
        },
      }

    case ADD_BEACON_TO_CONNECTION:
      return {
        ...state,
        [action.payload.connectionId]: {
          ...state[action.payload.connectionId],
          beacons: state[action.payload.connectionId].beacons.reduce((beacons, thisBeacon) => {
            if (!beacons.includes(thisBeacon))
              return [ ...beacons, thisBeacon ];
            return beacons;
          }, [ action.payload.newBeacon ]),
        },
      };

    default:
      return state;

  }
};
