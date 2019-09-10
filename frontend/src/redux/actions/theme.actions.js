export const SET_BACKGROUND_BLUR = 'SET_BACKGROUND_BLUR';

export const setBackgroundBlur = (isBackgroundBlurred = false) => {
  return {
    type: SET_BACKGROUND_BLUR,
    payload: {
      isBackgroundBlurred,
    },
  };
};
