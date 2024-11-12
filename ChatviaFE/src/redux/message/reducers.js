// src/redux/message/reducer.js

import {
    FETCH_MESSAGE_REQUEST,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_FAILURE,
    COPY_MESSAGE_REQUEST,
    COPY_MESSAGE_SUCCESS,
    COPY_MESSAGE_FAILURE,
    SAVE_MESSAGE_REQUEST,
    SAVE_MESSAGE_SUCCESS,
    SAVE_MESSAGE_FAILURE,
    FORWARD_MESSAGE_REQUEST,
    FORWARD_MESSAGE_SUCCESS,
    FORWARD_MESSAGE_FAILURE,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE,
    UPDATE_MESSAGE_SUCCES,
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    SEND_FILE_REQUEST,
    SEND_FILE_SUCCESS,
    SEND_FILE_FAILURE,
} from "../actionTypes";

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_MESSAGE_REQUEST:
        case COPY_MESSAGE_REQUEST:
        case SAVE_MESSAGE_REQUEST:
        case FORWARD_MESSAGE_REQUEST:
        case DELETE_MESSAGE_REQUEST:
        case UPLOAD_FILE_REQUEST:
        case SEND_FILE_REQUEST:
            return { ...state, loading: true, error: null };
        case SEND_FILE_SUCCESS:
            return {
                ...state, loading: false, messageResponse: action.payload,
            };
        case FETCH_MESSAGE_SUCCESS:
        case UPDATE_MESSAGE_SUCCES:
            return { ...state, loading: false, messages: action.payload };
            case UPLOAD_FILE_SUCCESS:
            return { ...state, loading: false, file: action.payload };
        case COPY_MESSAGE_SUCCESS:
        case SAVE_MESSAGE_SUCCESS:
        case FORWARD_MESSAGE_SUCCESS:
        case DELETE_MESSAGE_SUCCESS:
            return { ...state, loading: false };
        
        case FETCH_MESSAGE_FAILURE:
        case COPY_MESSAGE_FAILURE:
        case SAVE_MESSAGE_FAILURE:
        case FORWARD_MESSAGE_FAILURE:
        case DELETE_MESSAGE_FAILURE:
        case UPLOAD_FILE_FAILURE:
        case SEND_FILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default messageReducer;
