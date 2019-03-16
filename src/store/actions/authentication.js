import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});
export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      console.log((user.exp - currentTime) / 60);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    //this line will put the token in the code format
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/authors");
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      let response = await instance.post("/signup/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      history.push("/authors");
    } catch (error) {
      console.error(error.response.data);
    }
  };
};

//will delete the whole user obj
export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};
