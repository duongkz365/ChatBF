import {
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE,
    UNBLOCK_USER_REQUEST, UNBLOCK_USER_SUCCESS, UNBLOCK_USER_FAILURE,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
  } from '../admin/actions';
  
  const initialState = {
    users: [],
    blockedUsers: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true };
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.data, error: null };
      case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.error };
  
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map(user => user.userId === action.updatedUser.userId ? action.updatedUser : user),
        };
  
      case BLOCK_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(user => user.userId !== action.user.userId),
          blockedUsers: [...state.blockedUsers, action.user],
        };
  
      case UNBLOCK_USER_SUCCESS:
        return {
          ...state,
          blockedUsers: state.blockedUsers.filter(user => user.userId !== action.user.userId),
          users: [...state.users, action.user],
        };
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(user => user.userId !== action.userId),
          blockedUsers: state.blockedUsers.filter(user => user.userId !== action.userId),
        };
  
      case FETCH_USERS_FAILURE:
      case UPDATE_USER_FAILURE:
      case BLOCK_USER_FAILURE:
      case UNBLOCK_USER_FAILURE:
      case DELETE_USER_FAILURE:
        return { ...state, error: action.error };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  