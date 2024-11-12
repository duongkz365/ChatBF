import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    LOGIN_PROFILE_REQUEST,
    LOGIN_PROFILE_SUCCESS,
    LOGIN_PROFILE_FAILURE,
    REGISTER_PROFILE_REQUEST,
    REGISTER_PROFILE_SUCCESS,
    REGISTER_PROFILE_FAILURE,
    LOGOUT_PROFILE_REQUEST,
    LOGOUT_PROFILE_SUCCESS,
    LOGOUT_PROFILE_FAILURE,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILURE,
    FETCH_OTHER_PROFILE_REQUEST,
    FETCH_OTHER_PROFILE_SUCCESS,
    FETCH_OTHER_PROFILE_FAILURE,
} from "../actionTypes";

// ACTION FETCH PROFILE INFOMATION
export const fetchProfileRequest = () => (
    {
        type: FETCH_PROFILE_REQUEST
    }
);

export const fetchProfileSuccess = (data) => (
    {
        type: FETCH_PROFILE_SUCCESS,
        payload: data
    }
);

export const fetchProfileFailure = (error) => (
    {
        type: FETCH_PROFILE_FAILURE,
        payload: error
    }
);

export const fetchOtherProfileRequest = (id) => (
    {
        type: FETCH_OTHER_PROFILE_REQUEST,
        payload: {id}
    }
)


export const fetchOtherProfileSuccess = (data) => (
    {
        type: FETCH_OTHER_PROFILE_SUCCESS,
        payload: data
    }
);

export const fetchOtherProfileFailure = (error) => (
    {
        type: FETCH_OTHER_PROFILE_FAILURE,
        payload: error
    }
);







// ACTION LOGIN PROFILE

export const loginProfileRequest = (userName, passwordHash) => (
    {
        type: LOGIN_PROFILE_REQUEST,
        payload: { userName, passwordHash}
    }
);

export const loginProfileSuccess = (token) => (
    {
    type: LOGIN_PROFILE_SUCCESS,
    payload: token,
}
);

export const loginProfileFailure = (error) => (
    {
        type: LOGIN_PROFILE_FAILURE,
        payload: error
    }
);

// ACTION REGISTER PROFILE

export const registerProfileRequest = (userName, passwordHash, email) => (
    {
        type: REGISTER_PROFILE_REQUEST,
        payload: {userName, passwordHash, email}
    }
);

export const registerProfileSuccess = (data) => (
    {
        type: REGISTER_PROFILE_SUCCESS,
        payload: data
    }
);

export const registerProfileFailure = (error) => (
    {
        type: REGISTER_PROFILE_FAILURE,
        payload: error
    }
);

// ACTION LOGOUT PROFILE

export const logoutProfileRequest = () => (
    {
        type: LOGOUT_PROFILE_REQUEST
    }
);

export const logoutProfileSuccess = (data) => (
    {
        type: LOGOUT_PROFILE_SUCCESS,
        payload: data
    }
);

export const logoutProfileFailure = (error) => (
    {
        type: LOGOUT_PROFILE_FAILURE,
        payload: error
    }
);



// ACTION FORGET PASSWORD


export const forgetPasswordRequest = (email) => (
    {
        type: FORGET_PASSWORD_REQUEST,
        payload: {email}
    }
);


