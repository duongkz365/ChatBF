import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    API_FAILED
} from './constants';

// Cấu hình mới
export const loginUser = (userName, passwordHash,navigate) => ({
    type: 'LOGIN_USER',
    payload: { userName, passwordHash, navigate }, // Đảm bảo userName và passwordHash được truyền vào payload
});

export const registerUser = (userName, passwordHash, email, navigate) => ({
    type: 'REGISTER_USER',
    payload: { userName, passwordHash, email, navigate  }
});

export const loginUserSuccess = (token) => ({
    type: LOGIN_USER_SUCCESS,
    payload: token
});

export const apiError = (error) => ({
    type: API_FAILED,
    payload: error
});



// src/redux/actions.js
// export const logoutUser = () => ({
//     type: LOGOUT_USER,
// });


export const logoutUser = (navigate) => ({
    type: LOGOUT_USER,
    payload: { navigate }
});



export const logoutUserSuccess = (isUserLogout) => ({
    type: 'LOGOUT_USER_SUCCESS',
    payload: isUserLogout,
});

// export const logoutUserSuccess = () => {
//     return {
//       type: LOGOUT_USER_SUCCESS,
//       payload: {},
//     };
//   };



// export const loginUserSuccess = (user) => ({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
// });





export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});




export const forgetPassword = (email) => ({
    type: FORGET_PASSWORD,
    payload: { email }
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

// export const apiError = (error) => ({
//     type: API_FAILED,
//     payload: error
// });





