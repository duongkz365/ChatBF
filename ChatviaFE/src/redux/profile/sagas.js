import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchProfileSuccess,
  fetchProfileFailure,
  loginProfileSuccess,
  loginProfileFailure,
  logoutProfileFailure,
  logoutProfileSuccess,
  fetchOtherProfileSuccess
} from "./actions";
import {
  FETCH_PROFILE_REQUEST,
  LOGIN_PROFILE_REQUEST,
  REGISTER_PROFILE_REQUEST,
  LOGOUT_PROFILE_REQUEST,
  FETCH_OTHER_PROFILE_REQUEST,
  getCookie,
  FORGET_PASSWORD_REQUEST,
} from "../actionTypes";

import axios from "axios";

// FETCH PROFILE

function* fetchProfile() {
  try {
    const response = yield call(fetch, "https://localhost:7098/api/User", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(),
    });
    const data = yield response.json();
    yield put(fetchProfileSuccess(data));
  } catch (e) {
    yield put(fetchProfileFailure(e.message));
  }
}

// FETCH OTHER PROFILE


function* fetchOtherProfile({payload:{id}}) {
  yield console.log("Sagaa id: ", id)
  try {
    const response = yield call(fetch, "https://localhost:7098/api/User/profile", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = yield response.json();

    yield console.log(data)
    yield put(fetchOtherProfileSuccess(data))
  } catch (e) {
    // yield put(fetchProfileFailure(e.message));
    yield console.log("fail")
  }
}

// LOGIN PROFILE

function* loginProfile({ payload: { userName, passwordHash } }) {

  
  try {
   
    const response = yield call(fetch, "https://localhost:7098/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, passwordHash }),
    });
    if (!response.ok) {
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }



    const data = yield response.json();
    document.cookie = `token=${data.token}; path=/; max-age=${4320 * 60}`;
    yield put(loginProfileSuccess(data.token));
    window.location.href = "/dashboard";
  } catch (e) {
    console.log(e.message)
    yield put(loginProfileFailure(e.message));
  }
}

// REGISTER PROFILE

function* registerProfile({ payload: { userName, passwordHash, email } }) {
  try {
    const response = yield call(
      fetch,
      "https://localhost:7098/api/User/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, passwordHash, email }),
      }
    );
    
    if(!response.ok){
      const error = yield response.json();
      alert(error.message); 
    }else {
      const notification = yield response.json();
      alert(notification.message);
      
      if(notification.message === "USER REGISTERED SUCCESSFULLY!" )
      yield call(loginProfile, { payload: { userName, passwordHash} })
    }
  } catch (error) {}
}


// LOGOUT PROFILE

function* logoutProfile() {
  try {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // DELETE TOKEN
    yield put(logoutProfileSuccess(true));
    window.location.href = "/";
  } catch (e) {
    yield put(logoutProfileFailure(e.message));
  }
}



function* forgetPassword({ payload: { email } }) {

  yield console.log(email)

  try {
    const response = yield call(
          fetch,
          "https://localhost:7098/api/User/forget",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = yield response.json();
        alert("PLEASE VISIT EMAIL FORGET")
        window.location.href = "/login";
  }catch(e){

  }
  
}


export function* watchFetchProfile() {
  yield all([
    takeLatest(FETCH_PROFILE_REQUEST, fetchProfile),
    takeLatest(LOGIN_PROFILE_REQUEST, loginProfile),
    takeLatest(REGISTER_PROFILE_REQUEST, registerProfile),
    takeLatest(LOGOUT_PROFILE_REQUEST, logoutProfile),
    takeLatest(FETCH_OTHER_PROFILE_REQUEST, fetchOtherProfile),
    takeLatest(FORGET_PASSWORD_REQUEST, forgetPassword)
  ]);
}
