import {
  SET_BACKGROUND_BLUR,
} from '../actions';

const initalState = {
  isBackgroundBlurred: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_BACKGROUND_BLUR:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
