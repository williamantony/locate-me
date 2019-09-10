import axios from 'axios';
import History from '../../History';
import { getEndpoint } from '../../helper';
import { getClientId, getCurrentConnectionId } from './helper';
import { hideModal } from '../actions';

const REST_URL = getEndpoint('REST');

export const CREATE_BEACON = 'CREATE_BEACON';
export const GET_BEACONS_LIST = 'GET_BEACONS_LIST';
export const GET_BEACON_INFO = 'GET_BEACON_INFO';

export const GET_CONNECTED_BEACONS = 'GET_CONNECTED_BEACONS';
export const ADD_BEACON_TO_CONNECTION = 'ADD_BEACON_TO_CONNECTION';

export const SET_SELECTED_BEACON = 'SET_SELECTED_BEACON';
export const SET_BEACON_LOCATION = 'SET_BEACON_LOCATION';



export const createBeacon = (name) => {
  return async dispatch => {
    try {

      const connectionId = await getCurrentConnectionId();

      const endpoint = `${REST_URL}/beacons`;

      const response = await axios.post(endpoint, {
        connectionId,
        name,
      });

      const { newBeacon } = response.data;
      const newBeaconId = Object.keys(newBeacon)[0];

      dispatch({
        type: CREATE_BEACON,
        payload: {
          newBeacon,
          newBeaconId,
        },
      });

      dispatch({
        type: ADD_BEACON_TO_CONNECTION,
        payload: {
          connectionId,
          newBeacon: newBeaconId,
        },
      });

      dispatch(hideModal('CreateNewBeaconModal'));

    } catch (error) {
      console.log(error)
    }
  };
};



export const getBeaconsList = () => {
  return async dispatch => {

    const connectionId = await getCurrentConnectionId();

    const endpoint = `${REST_URL}/beacons/list`;

    const response = await axios.post(endpoint, {
      connectionId,
    });

    if (!response.data.beacons) {
      throw new Error('Error: getConnectionInstances()');
    }

    const { beacons } = response.data;
    
    dispatch({
      type: GET_BEACONS_LIST,
      payload: {
        beacons,
      },
    });

    dispatch({
      type: GET_CONNECTED_BEACONS,
      payload: {
        connectionId,
        beacons: Object.keys(beacons),
      },
    });

  };
};



export const setBeaconUser = (inviteCode = null) => {
  return async dispatch => {
    try {

      const clientId = await getClientId();

      const endpoint = `${REST_URL}/beacons/user`;

      const response = await axios.post(endpoint, {
        clientId,
        inviteCode,
      });

      if (response.data.success) {
        History.push('/');
        dispatch(hideModal('AcceptInvitationModal'));
      }

    } catch (error) {
      console.log(error);
    }
  };
};



export const selectBeacon = (beacon) => {
  return async dispatch => {

    dispatch({
      type: SET_SELECTED_BEACON,
      payload: {
        beacon,
      },
    });

  };
};



export const setBeaconLocation = (beacon, location) => {
  return dispatch => {
    try {

      dispatch({
        type: SET_BEACON_LOCATION,
        payload: {
          beacon,
          location,
        },
      })

    } catch (error) {
      console.log(error);
    }
  };
};
