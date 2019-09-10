
import axios from 'axios';
import { getEndpoint } from '../../helper';
import { getClientId } from './helper';

const REST_URL = getEndpoint('REST');

export const GET_CONNECTIONS = 'GET_CONNECTIONS';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const SET_CURRENT_CONNECTION = 'SET_CURRENT_CONNECTION';

export const GET_CONNECTED_BEACONS = 'GET_CONNECTED_BEACONS';
export const CREATE_CONNECTION_INSTANCE = 'CREATE_CONNECTION_INSTANCE';



export const getConnections = () => {
  return async dispatch => {

    const clientId = await getClientId();

    const endpoint = `${REST_URL}/connections/list`;

    const response = await axios.post(endpoint, {
      clientId,
    });

    if (Array.isArray(response.data.connections)) {

      const connections = response.data.connections.reduce((connectionObject, thisConnection) => {
        return {
          ...connectionObject,
          [thisConnection.connection_id]: {
            name: thisConnection.name,
            status: thisConnection.status,
            beacons: [],
          },
        };
      }, {});

      dispatch({
        type: SET_CURRENT_CONNECTION,
        payload: {
          connectionId: response.data.connections[0].connection_id,
        },
      })

      dispatch({
        type: GET_CONNECTIONS,
        payload: {
          connections,
        },
      });

    }

  };
};
