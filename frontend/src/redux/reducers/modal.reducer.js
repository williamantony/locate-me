import {
  CREATE_MODAL,
  DESTROY_MODAL,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions';

const initalState = {
  modals: [],
  instances: {},
};

export default (state = initalState, action) => {
  switch (action.type) {
    case CREATE_MODAL:
      return {
        ...state,
        modals: [
          ...state.modals,
          action.payload.modalId,
        ],
        instances: {
          ...state.instances,
          [action.payload.modalId]: {
            id: action.payload.modalId,
            content: action.payload.content,
            isVisible: action.payload.isVisible || false,
          },
        },
      };

    case DESTROY_MODAL:
      return {
        ...state,
        modals: state.modals.filter(modal => modal !== action.payload.modalId),
        instances: Object.keys(state.instances).reduce((newState, modalId) => {
          if (modalId !== action.payload.modalId) {
            return {
              ...newState,
              [modalId]: state.instances[modalId],
            };
          }
          return newState;
        }, {}),
      };

    case SHOW_MODAL:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.payload.modalId]: {
            ...state.instances[action.payload.modalId],
            isVisible: true,
          },
        },
      };

    case HIDE_MODAL:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.payload.modalId]: {
            ...state.instances[action.payload.modalId],
            isVisible: false,
          },
        },
      };

    default:
      return state;
  }
};
