import {
  CREATE_BEACON,
  GET_BEACONS_LIST,
  SET_SELECTED_BEACON,
  SET_BEACON_LOCATION,
} from '../actions';

const initialState = {
  instances: {},
  list: [],
  selectedBeacon: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BEACON:
      return {
        ...state,
        instances: {
          ...state.instances,
          ...action.payload.newBeacon,
        },
        list: state.list.reduce((beaconsList, beacon) => {
          const { newBeaconId } = action.payload;
          const newBeaconsList = [ ...beaconsList, beacon ];

          if (!newBeaconsList.includes(newBeaconId))
            newBeaconsList.push(newBeaconId);

          return newBeaconsList;
        }, []),
        selectedBeacon: action.payload.newBeaconId,
      };

    case GET_BEACONS_LIST:
      return {
        ...state,
        instances: action.payload.beacons,
        list: Object.keys(action.payload.beacons),
      };

    case SET_SELECTED_BEACON:
      return {
        ...state,
        selectedBeacon: action.payload.beacon,
      };

    case SET_BEACON_LOCATION:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.payload.beacon]: {
            ...state.instances[action.payload.beacon],
            location: action.payload.location,
          },
        },
      };

    default:
      return state;
  }
};
