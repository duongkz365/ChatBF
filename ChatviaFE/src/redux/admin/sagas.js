import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE,
  UNBLOCK_USER_REQUEST, UNBLOCK_USER_SUCCESS, UNBLOCK_USER_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../admin/actions';

// API helper
const fetchUsersAPI = async (endpoint) => {
  const response = await fetch(`https://localhost:7098/api/Admin/${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

const updateUserAPI = async (userId, userData) => {
  const response = await fetch(`https://localhost:7098/api/Admin/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

const blockUserAPI = async (userId) => {
  const response = await fetch(`https://localhost:7098/api/Admin/block/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

const unblockUserAPI = async (userId) => {
  const response = await fetch(`https://localhost:7098/api/Admin/unblock/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

const deleteUserAPI = async (userId) => {
  const response = await fetch(`https://localhost:7098/api/Admin/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};

// Fetch users saga
function* fetchUsersSaga(action) {
  try {
    const endpoint = action.showBlocked ? 'blocked' : 'unblocked';
    const data = yield call(fetchUsersAPI, endpoint);
    yield put({ type: FETCH_USERS_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, error });
  }
}

// Update user saga
function* updateUserSaga(action) {
  try {
    const data = yield call(updateUserAPI, action.userId, action.userData);
    yield put({ type: UPDATE_USER_SUCCESS, updatedUser: data });
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, error });
  }
}

// Block user saga
function* blockUserSaga(action) {
  try {
    const data = yield call(blockUserAPI, action.userId);
    yield put({ type: BLOCK_USER_SUCCESS, user: data });
  } catch (error) {
    yield put({ type: BLOCK_USER_FAILURE, error });
  }
}

// Unblock user saga
function* unblockUserSaga(action) {
  try {
    const data = yield call(unblockUserAPI, action.userId);
    yield put({ type: UNBLOCK_USER_SUCCESS, user: data });
  } catch (error) {
    yield put({ type: UNBLOCK_USER_FAILURE, error });
  }
}

// Delete user saga
function* deleteUserSaga(action) {
  try {
    yield call(deleteUserAPI, action.userId);
    yield put({ type: DELETE_USER_SUCCESS, userId: action.userId });
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, error });
  }
}

export function* userSaga() {
  yield takeEvery(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(BLOCK_USER_REQUEST, blockUserSaga);
  yield takeEvery(UNBLOCK_USER_REQUEST, unblockUserSaga);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
}
