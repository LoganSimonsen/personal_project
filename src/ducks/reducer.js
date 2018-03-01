import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
export const GET_USER_ADMINS = "GET_USER_ADMINS";
const DESTROY_USER = "DESTROY_USER";

// ACTION CREATORS

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/me")
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(err => {
        return err.message
      })
       
  };
}

export function getUserAdmins() {
  return {
    type: GET_USER_ADMINS,
    payload: axios
      .get("/api/admin")
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err.message);
      })
       
  };
}

export function logout() {
  return {
    type: DESTROY_USER,
    payload: axios
      .get("/api/logout")
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message
      })
       
  };
}

// INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, { 
          isLoading: false, 
          didErr: true, 
          errMessage: action.payload 
      });
    default:
      return state;
  }
}