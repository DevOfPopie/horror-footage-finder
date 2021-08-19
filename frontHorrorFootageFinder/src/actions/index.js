// Pass Splash Action
export const PASS_SPLASH = 'PASS_SPLASH';
export const passSplash = () => ({
  type: PASS_SPLASH,
});

// Store the current movie data for MovieInfo component
export const SET_CURRENT_MOVIE_DATA = 'SET_CURRENT_MOVIE_DATA';
export const setCurrentMovieData = (currentMovieData) => ({
  type: SET_CURRENT_MOVIE_DATA,
  currentMovieData,
});

// Quiz Action
export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';
export const SWITCH_TO_NEXT_QUESTION = 'SWITCH_TO_NEXT_QUESTION';

export const chooseAnAnswser = (answer) => ({
  type: CHOOSE_AN_ANSWER,
  answer,
});

export const switchToNextQuestion = () => ({
  type: SWITCH_TO_NEXT_QUESTION,
});

// REGISTER-LOGIN Actions
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CHANGE_INPUT_VALUE_LOGIN = 'CHANGE_INPUT_VALUE_LOGIN';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const TOGGLE_MASKED = 'TOGGLE_MASKED';
export const GET_DATA = 'GET_DATA';
export const LOGIN = 'LOGIN';
export const SUBMITREGISTER = 'SUBMIT_REGISTER';
export const changeInputValue = (value, name) => ({
  type: CHANGE_INPUT_VALUE,
  value,
  name,
});
export const submitForm = (value) => ({
  type: SUBMIT_FORM,
  value,
});
export const changeInputValueLogin = (value, name) => ({
  type: CHANGE_INPUT_VALUE_LOGIN,
  value,
  name,
});
export const toggleMasked = () => ({
  type: TOGGLE_MASKED,
});
export const login = () => ({
  type: LOGIN,
});
export const getDataMovies = () => ({
  type: GET_DATA,
});
export const submitRegister = (pseudo, email, password) => ({
  type: SUBMITREGISTER,
  pseudo,
  email,
  password,
});
