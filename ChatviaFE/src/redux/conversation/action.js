

import { 
    FETCH_CONVERSATION_REQUEST, 
    FETCH_CONVERSATION_SUCCESS, 
    FETCH_CONVERSATION_FAILURE 
} from "./actionType";




// Action để gửi yêu cầu fetch
export const fetchConversationRequest = () => ({
    type: FETCH_CONVERSATION_REQUEST,
});

// Action khi fetch thành công
export const fetchConversationSuccess = (data) => ({
    type: FETCH_CONVERSATION_SUCCESS,
    payload: data,
});

// Action khi fetch thất bại
export const fetchConversationFailure = (error) => ({
    type: FETCH_CONVERSATION_FAILURE,
    payload: error,
});
