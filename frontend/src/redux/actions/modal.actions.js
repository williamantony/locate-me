export const CREATE_MODAL = 'CREATE_MODAL';
export const DESTROY_MODAL = 'DESTROY_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const createModal = (modalId, content = null, isVisible = false) => {
  return dispatch => {

    dispatch({
      type: CREATE_MODAL,
      payload: {
        modalId,
        content,
        isVisible,
      },
    });

    setTimeout(
      () => {
        dispatch(showModal(modalId));
      }, 250
    );

  };
};

export const showModal = (modalId) => {
  return {
    type: SHOW_MODAL,
    payload: {
      modalId,
    },
  };
};


export const hideModal = (modalId) => {
  return dispatch => {

    dispatch({
      type: HIDE_MODAL,
      payload: {
        modalId,
      },
    });

    setTimeout(
      () => {
        dispatch(destroyModal(modalId));
      }, 500
    );

  };
};


export const destroyModal = (modalId) => {
  return {
    type: DESTROY_MODAL,
    payload: {
      modalId,
    },
  };
};
