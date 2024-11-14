import {
    FETCH_CONVERSATION_REQUEST,
    FETCH_CONVERSATION_SUCCESS,
    FETCH_CONVERSATION_FAILURE,
} from './actionType';

const initialState = {
    conversations: [],
    loading: false,
    error: null,
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONVERSATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: action.payload,
                loading: false,
            };
        case FETCH_CONVERSATION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default conversationReducer;
