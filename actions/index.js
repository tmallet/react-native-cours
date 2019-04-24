import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { SET_CURRENT_WEATHER, SET_FORECAST_WEATHER, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from './action-types';
import { API_KEY, FACEBOOK_APP_ID } from '../constant';
import { Facebook } from 'expo';

const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";

export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(`${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
  dispatch({ type: SET_CURRENT_WEATHER, payload: response.data })
};

export const getForecastWeatherByCity = city => async dispatch => {
  const response = await axios.get(`${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
  dispatch({ type: SET_FORECAST_WEATHER, payload: response.data })
};

export const facebookLogin = (onSuccess, onError) => dispatch => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permission: ["public_profil"]
  }).then(fbResponse => {
    if (fbResponse.type === "success") {
      setToken(fbResponse.token);
      AsyncStorage.setItem("fbToken", fbResponse.token);
      onSuccess && onSuccess();
    } else {
      dispatch({ type: FACEBOOK_LOGIN_ERROR });
      onError && onError();
    }
  }).catch(error => {
    dispatch({ type: FACEBOOK_LOGIN_ERROR });
    onError && onError();
  });
};

export const setToken = (token) => dispatch => {
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}