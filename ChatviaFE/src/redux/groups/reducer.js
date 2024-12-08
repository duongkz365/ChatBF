// src/redux/GROUP/reducer.js

import {
  ACCEPT_GROUP_FAILURE,
  ACCEPT_GROUP_REQUEST,
  ACCEPT_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_REQUEST,
  FETCH_GROUP_FAILURE,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  GET_GROUP_BY_ID_FAILURE,
  GET_GROUP_BY_ID_REQUEST,
  GET_GROUP_BY_ID_SUCCESS,
} from "../actionTypes";

const initialState = {
  group: [],
  loading: false,
  error: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_REQUEST:
      return { ...state, loading: true, group: [] };

    case FETCH_GROUP_SUCCESS:
      return { ...state, loading: false, group: action.payload };

    case FETCH_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_GROUP_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        group: null,
        error: null,
      };
    case GET_GROUP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        error: null,
      };

    case GET_GROUP_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        group: null,
        error: action.payload,
      };

    case CREATE_GROUP_REQUEST:
      return { ...state, loading: true };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: [...state.group, action.payload],
      };
    case CREATE_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ACCEPT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_GROUP_SUCCESS:
      return { ...state, loading: false, invite: action.payload };
    case ACCEPT_GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_GROUP_REQUEST:
      return {
        ...state,
        group: state.group.filter((group) => group.name !== action.payload),
      };

    default:
      return state;
  }
};

export default groupReducer;
