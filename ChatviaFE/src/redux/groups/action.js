import {
  ACCEPT_GROUP_REQUEST,
  CANCEL_GROUP_REQUEST,
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_REQUEST,
  FETCH_GROUP_FAILURE,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  REFUSE_GROUP_REQUEST,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
} from "../actionTypes";
export const GET_GROUP_BY_ID_REQUEST = "GET_GROUP_BY_ID_REQUEST";
export const GET_GROUP_BY_ID_SUCCESS = "GET_GROUP_BY_ID_SUCCESS";
export const GET_GROUP_BY_ID_FAILURE = "GET_GROUP_BY_ID_FAILURE";
export const fetchGroupRequest = () => ({
  type: FETCH_GROUP_REQUEST,
});

export const fetchGroupSuccess = (GROUPS) => ({
  type: FETCH_GROUP_SUCCESS,
  payload: GROUPS,
});

export const fetchGroupFailure = (error) => ({
  type: FETCH_GROUP_FAILURE,
  payload: error,
});

export const CreateGroupRequest = (payload) => ({
  type: CREATE_GROUP_REQUEST,
  payload: { payload },
});

export const creategroupSuccess = (payload) => ({
  type: CREATE_GROUP_SUCCESS,
  payload: payload,
});

export const CreateGroupFailure = (error) => ({
  type: CREATE_GROUP_FAILURE,
  payload: error,
});

export const acceptGROUPRequest = (userId) => ({
  type: ACCEPT_GROUP_REQUEST,
  payload: { userId },
});

export const acceptGROUPSuccess = (message) => ({
  type: ACCEPT_GROUP_REQUEST,
  payload: message,
});

export const acceptGROUPFailure = (error) => ({
  type: ACCEPT_GROUP_REQUEST,
  payload: error,
});

export const cancelGROUPRequest = (userId) => ({
  type: CANCEL_GROUP_REQUEST,
  payload: { userId },
});

export const refuseGROUPRequest = (userId) => ({
  type: REFUSE_GROUP_REQUEST,
  payload: { userId },
});

export const deleteGroupRequest = (groupName) => {
  return {
    type: DELETE_GROUP_REQUEST,
    payload: groupName,
  };
};

// Action creators
export const getGroupByIdRequest = (groupId) => ({
  type: GET_GROUP_BY_ID_REQUEST,
  payload: groupId,
});

export const getGroupByIdSuccess = (group) => ({
  type: GET_GROUP_BY_ID_SUCCESS,
  payload: group,
});

export const getGroupByIdFailure = (error) => ({
  type: GET_GROUP_BY_ID_FAILURE,
  payload: error,
});

// Action to initiate group update
export const updateGroupRequest = (group) => ({
  type: UPDATE_GROUP_REQUEST,
  payload: group,
});

// Action for successful update
export const updateGroupSuccess = (group) => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: group,
});

// Action for update failure
export const updateGroupFailure = (error) => ({
  type: UPDATE_GROUP_FAILURE,
  payload: error,
});