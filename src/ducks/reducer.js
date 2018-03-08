import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
export const GET_USER_ADMINS = "GET_USER_ADMINS";
const DESTROY_USER = "DESTROY_USER";
const ENABLE_ADMIN = "ENABLE_ADMIN";
const DISABLE_ADMIN = "DISABLE_ADMIN";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CREATE_ADMIN = "CREATE_ADMIN";

// ACTION CREATORS

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/me")
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message
      })
       
  };
}

export function createAdmin(name, authid) {
  console.log('passed to reducer', name, authid);
  return {
    type: CREATE_ADMIN,
    payload: axios
    .post('/api/insert', {
      name,
      authid
    })
      .then(response => {
        console.log('returned to reducer', response);
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

export function enableAdmin(name) {
  return {
    type: ENABLE_ADMIN,
    payload: axios.put(`/api/enable/${name}`).then(response => {
      return response.data;
    })
  }
}

export function disableAdmin(name) {
  return {
    type: DISABLE_ADMIN,
    payload: axios.put(`/api/disable/${name}`).then(response => {
      return response.data;
    })
  }
}

export function getAllUsers() {
  return {
    type: GET_ALL_USERS,
    payload: axios.get(`/api/getallusers/`).then(response => {
      console.log('RESPONSE IN REQ: ', response)
      return response.data;
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
  errMessage: null,
  userAdmins: [],
  allUsers: []
};

export default function reducer(state = initialState, action) {
  console.log(action);
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

    case `${GET_USER_ADMINS}_FULFILLED`:
      return Object.assign({}, state, { userAdmins: action.payload });

    case `${GET_ALL_USERS}_FULFILLED`:
      return Object.assign({}, state, { allUsers: action.payload });
    case `${ENABLE_ADMIN}_FULFILLED`:
      return Object.assign({}, state, { userAdmins: action.payload });
      case `${DISABLE_ADMIN}_FULFILLED`:
      return Object.assign({}, state, { userAdmins: action.payload });
      
    default:
      return state;
  }
}