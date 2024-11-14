// src/redux/auth/reducer.js
import { LOGIN_USER, LOGIN_USER_SUCCESS, API_FAILED, LOGOUT_USER_SUCCESS, REGISTER_USER } from './constants';

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: null };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case REGISTER_USER:
            return  { ...state, loading: true, error: null };
        case API_FAILED:
            return { ...state, loading: false, error: action.payload };
            case LOGOUT_USER_SUCCESS:
                return {
                    ...state,
                    isUserLoggedIn: false,
                    token: null, // Reset token khi logout
                };
        default:
            return state;
    }
};

export default authReducer;
