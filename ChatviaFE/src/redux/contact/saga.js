// src/redux/contact/saga.js

import { call, put, takeLatest, all, take } from "redux-saga/effects";
// import { fetchContactSuccess, fetchContactFailure } from '../contact/action';
import { fetchContactSuccess, fetchContactFailure, fetchContactRequest, acceptContactSuccess } from "../contact/action";
// import { FETCH_CONTACT_REQUEST } from './actionTypes';
import { ACCEPT_CONTACT_REQUEST, CANCEL_CONTACT_REQUEST, DELETE_CONTACT_REQUEST, FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS, INVITE_CONTACT_REQUEST, REFUSE_CONTACT_REQUEST } from "../actionTypes";
import { Alert } from "reactstrap";

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
};
// Hàm gọi API lấy danh sách contact
function* fetchContacts() {
  try {
    const response = yield call(fetch, 'https://localhost:7098/api/Contact/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
        },
    });
    const data = yield response.json();
    yield put(fetchContactSuccess(data));
  }catch(e){
    yield put(fetchContactFailure(e.message));
  }
}



function* inviteContacts({payload: {userName}}) {
  try {
    const response = yield call(fetch, 'https://localhost:7098/api/Contact/invite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
            'userName': userName
        },
        body: JSON.stringify(),
    });
    const data = yield response.json();
    yield alert(data.message);
    // yield put(fetchContactSuccess(data));
    yield put(fetchContactRequest());

  }catch(e){
    // yield put(fetchContactFailure(e.message));
    yield alert(e.message);
  }
}


function* acceptContacts({payload: {userId}}) {


 yield console.log(userId,"saga")
  try {
    const response = yield call(fetch, 'https://localhost:7098/api/Contact/accept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
            'userId': userId
        },
        body: JSON.stringify(),
    });


    const data = yield response.json();
    yield put(fetchContactRequest());
    yield take(FETCH_CONTACT_SUCCESS);
    // yield alert(data.message);
    yield console.log(data.message);
  }catch(e){
    // yield put(fetchContactFailure(e.message));
    yield alert(e.message);
  }
}

function* cancelContacts({payload: {userId}}) {
   try {
     const response = yield call(fetch, 'https://localhost:7098/api/Contact/cancel', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${getCookie("token")}`,
             'userId': userId
         },
         body: JSON.stringify(),
     });
     
 
     const data = yield response.json();
     yield put(fetchContactRequest());
     yield take(FETCH_CONTACT_SUCCESS);
     yield console.log(data.message);
   }catch(e){
     // yield put(fetchContactFailure(e.message));
     yield console.log(e.message)
   }
 }


 function* refuseContacts({payload: {userId}}) {
  try {
    const response = yield call(fetch, 'https://localhost:7098/api/Contact/refuse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
            'userId': userId
        },
        body: JSON.stringify(),
    });
    

    const data = yield response.json();
    yield put(fetchContactRequest());
    yield take(FETCH_CONTACT_SUCCESS);
    yield console.log(data.message);
  }catch(e){
    // yield put(fetchContactFailure(e.message));
    yield console.log(e.message)
  }
}

function* deleteContacts({payload: {userId}}) {
  try {
    const response = yield call(fetch, 'https://localhost:7098/api/Contact/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
            'userId': userId
        },
        body: JSON.stringify(),
    });
    

    const data = yield response.json();
    yield put(fetchContactRequest());
    yield take(FETCH_CONTACT_SUCCESS);
    yield console.log(data.message);
  }catch(e){
    // yield put(fetchContactFailure(e.message));
    yield console.log(e.message)
  }
}



// Watcher Saga
export function* watchFetchContacts() {
  yield all([
  takeLatest(FETCH_CONTACT_REQUEST, fetchContacts),
  takeLatest(INVITE_CONTACT_REQUEST, inviteContacts),
  takeLatest(ACCEPT_CONTACT_REQUEST, acceptContacts),
  takeLatest(CANCEL_CONTACT_REQUEST, cancelContacts),
  takeLatest(REFUSE_CONTACT_REQUEST, refuseContacts),
  takeLatest(DELETE_CONTACT_REQUEST, deleteContacts)
  ])
}



