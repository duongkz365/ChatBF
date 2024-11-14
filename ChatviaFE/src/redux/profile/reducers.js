import {
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_FAILURE,
    LOGIN_PROFILE_REQUEST,
    REGISTER_PROFILE_REQUEST,
    LOGOUT_PROFILE_REQUEST,
    LOGIN_PROFILE_SUCCESS,
    REGISTER_PROFILE_SUCCESS,
    LOGOUT_PROFILE_SUCCESS,
    LOGIN_PROFILE_FAILURE,
    REGISTER_PROFILE_FAILURE,
    LOGOUT_PROFILE_FAILURE,
    FETCH_OTHER_PROFILE_REQUEST,
    FETCH_OTHER_PROFILE_SUCCESS
} from "../actionTypes"


const initialState = {
    token: null,
    profile: {},
    loading: false,
    error: null
}
const profileReducer = (state = initialState, action) => {
    switch(action.type){


        case LOGIN_PROFILE_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loading: false  
            };
        case FETCH_PROFILE_REQUEST:
        case LOGIN_PROFILE_REQUEST:
        case REGISTER_PROFILE_REQUEST:
        case LOGOUT_PROFILE_REQUEST:
        case FETCH_OTHER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case FETCH_OTHER_PROFILE_SUCCESS:
            return {
                ...state,
                otherProfile: action.payload,
                loading: false
            }
        case REGISTER_PROFILE_SUCCESS:
        case LOGOUT_PROFILE_SUCCESS:
            return {
                ...state,
                token: action.payload,
                loading: false
            }
        case FETCH_PROFILE_FAILURE:
        case LOGIN_PROFILE_FAILURE:
        case REGISTER_PROFILE_FAILURE:
        case LOGOUT_PROFILE_FAILURE:
            return {
                ...state, 
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer;