// src/redux/contact/reducer.js

import {
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  INVITE_CONTACT_REQUEST,
  INVITE_CONTACT_SUCCESS,
  INVITE_CONTACT_FAILURE,
  ACCEPT_CONTACT_REQUEST,
  ACCEPT_CONTACT_SUCCESS,
  ACCEPT_CONTACT_FAILURE,
} from "../actionTypes";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONTACT_SUCCESS:
      return { ...state, loading: false, contacts: action.payload };
    case FETCH_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case INVITE_CONTACT_REQUEST:
      return { ...state, loading: true };
    case INVITE_CONTACT_SUCCESS:
      return { ...state, loading: false, invite: action.payload };
    case INVITE_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ACCEPT_CONTACT_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_CONTACT_SUCCESS:
      return { ...state, loading: false, invite: action.payload };
    case ACCEPT_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default contactReducer;
