import { 
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE,
    UNBLOCK_USER_REQUEST, UNBLOCK_USER_SUCCESS, UNBLOCK_USER_FAILURE,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
  } from '../admin/types';
  
  // Fetch Users Action
  export const fetchUsersRequest = (showBlocked) => ({
    type: FETCH_USERS_REQUEST,
    showBlocked,
  });
  
  export const fetchUsersSuccess = (data) => ({
    type: FETCH_USERS_SUCCESS,
    data,
  });
  
  export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    error,
  });
  
  // Update User Action
  export const updateUserRequest = (userId, userData) => ({
    type: UPDATE_USER_REQUEST,
    userId,
    userData,
  });
  
  export const updateUserSuccess = (updatedUser) => ({
    type: UPDATE_USER_SUCCESS,
    updatedUser,
  });
  
  export const updateUserFailure = (error) => ({
    type: UPDATE_USER_FAILURE,
    error,
  });
  
  // Block User Action
  export const blockUserRequest = (userId) => ({
    type: BLOCK_USER_REQUEST,
    userId,
  });
  
  export const blockUserSuccess = (user) => ({
    type: BLOCK_USER_SUCCESS,
    user,
  });
  
  export const blockUserFailure = (error) => ({
    type: BLOCK_USER_FAILURE,
    error,
  });
  
  // Unblock User Action
  export const unblockUserRequest = (userId) => ({
    type: UNBLOCK_USER_REQUEST,
    userId,
  });
  
  export const unblockUserSuccess = (user) => ({
    type: UNBLOCK_USER_SUCCESS,
    user,
  });
  
  export const unblockUserFailure = (error) => ({
    type: UNBLOCK_USER_FAILURE,
    error,
  });
  
  // Delete User Action
  export const deleteUserRequest = (userId) => ({
    type: DELETE_USER_REQUEST,
    userId,
  });
  
  export const deleteUserSuccess = (userId) => ({
    type: DELETE_USER_SUCCESS,
    userId,
  });
  
  export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    error,
  });
  