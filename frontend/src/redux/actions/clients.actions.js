import axios from "axios";
import Socket from '../../Socket';
import { getEndpoint } from "../../helper";
import { getClientId, getSocketId } from "./helper";
import { hideModal } from "./modal.actions";

const REST_URL = getEndpoint('REST');

export const SET_CLIENT_ID = 'SET_CLIENT_ID';
export const SET_CLIENT_NAME = 'SET_CLIENT_NAME';
export const SET_CLIENT_INFO = 'SET_CLIENT_INFO';
export const SET_CLIENT_LOCATION = 'SET_CLIENT_LOCATION';



/**
 * Create ClientId
 */
export const createClientRequest = () => {
  return new Promise(async (resolve, reject) => {
    try {

      const endpoint = `${REST_URL}/clients`;

      const requestBody = {
        clientId: localStorage.getItem('client') || null,
      };

      const response = await axios.post(endpoint, requestBody);

      const {
        clientId,
        name,
        socket,
        location,
      } = response.data;

      if (response.data.error)
        throw new Error('Error: setClientId()');

      resolve({
        clientId,
        name,
        socket,
        location,
      });

    } catch (error) {

      console.log(error);
      reject(false);

    }
  });
};



/**
 * Saves User Name in the DB
 */
export const setClientNameRequest = (name) => {
  return new Promise(async (resolve, reject) => {
    try {

      const endpoint = `${REST_URL}/clients/name`;

      const requestBody = {
        clientId: await getClientId(),
        socket: await getSocketId(),
        name,
      };

      const response = await axios.post(endpoint, requestBody);

      if (response.data.error)
        throw new Error('Error: setClientId()');

      resolve(response.data.name);

    } catch (error) {

      console.log(error);
      reject(false);

    }
  });
};



export const setClientInfo = (newState = {}) => {
  return dispatch => {

    dispatch({
      type: SET_CLIENT_INFO,
      payload: {
        ...newState,
      },
    });

  };
};



export const setClientId = (clientId) => {
  return dispatch => {

    localStorage.setItem('client', clientId);

    dispatch(
      setClientInfo({ clientId })
    );

  };
};



export const setClientName = (name) => {
  return async dispatch => {
    
    await setClientNameRequest(name);

    dispatch(
      setClientInfo({ name })
    );

    dispatch(
      hideModal('SetUserNameModal')
    );

  };
};



export const setClientLocation = (latLng) => {
  return async dispatch => {

    const clientId = await getClientId();

    const location = {
      latLng,
      updatedAt: new Date().getTime(),
    };

    Socket.emit('set-location', {
      clientId,
      location,
    });

    dispatch(
      setClientInfo({
        location,
      })
    );

  };
};
