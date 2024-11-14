// src/redux/message/actions.js

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
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEEN_MESSAGE_REQUEST,
    SEEN_MESSAGE_SUCCESS,
    SEEN_MESSAGE_FAILURE,
    UPDATE_MESSAGE_SUCCES,
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    SEND_FILE_REQUEST, SEND_FILE_SUCCESS, SEND_FILE_FAILURE
} from "../actionTypes";

// Actions cho việc fetch
export const fetchMessageRequest = () => ({
    type: FETCH_MESSAGE_REQUEST,
});

export const fetchMessageSuccess = (messages) => ({
    type: FETCH_MESSAGE_SUCCESS,
    payload: messages,
});

export const fetchMessageFailure = (error) => ({
    type: FETCH_MESSAGE_FAILURE,
    payload: error,
});

// Actions cho các thao tác message với request, success, failure
export const copyMessageRequest = (messageId) => ({
    type: COPY_MESSAGE_REQUEST,
    payload: messageId,
});

export const copyMessageSuccess = (messageId) => ({
    type: COPY_MESSAGE_SUCCESS,
    payload: messageId,
});

export const copyMessageFailure = (error) => ({
    type: COPY_MESSAGE_FAILURE,
    payload: error,
});


// SEND MESSAGE

export const saveMessageRequest = (senderId, receiverId, messageType, content, mediaUrl, isGroup) => ({
    type: SAVE_MESSAGE_REQUEST,
    payload: {senderId, receiverId, messageType, content, mediaUrl, isGroup},
});

export const saveMessageSuccess = (messageId) => ({
    type: SAVE_MESSAGE_SUCCESS,
    payload: messageId,
});

export const saveMessageFailure = (error) => ({
    type: SAVE_MESSAGE_FAILURE,
    payload: error,
});

export const forwardMessageRequest = (messageId) => ({
    type: FORWARD_MESSAGE_REQUEST,
    payload: messageId,
});

export const forwardMessageSuccess = (messageId) => ({
    type: FORWARD_MESSAGE_SUCCESS,
    payload: messageId,
});

export const forwardMessageFailure = (error) => ({
    type: FORWARD_MESSAGE_FAILURE,
    payload: error,
});

export const deleteMessageRequest = (messageId) => ({
    type: DELETE_MESSAGE_REQUEST,
    payload: messageId,
});

export const deleteMessageSuccess = (messageId) => ({
    type: DELETE_MESSAGE_SUCCESS,
    payload: messageId,
});

export const deleteMessageFailure = (error) => ({
    type: DELETE_MESSAGE_FAILURE,
    payload: error,
});


export const sendMessageRequest = ( receiverId, messageType, content, mediaUrl, isGroupMessage) => ({
    type: SEND_MESSAGE_REQUEST,
    payload: { receiverId, messageType, content, mediaUrl, isGroupMessage},
});

export const sendMessageSuccess = (messageId) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: messageId,
});

export const sendMessageFailure = (error) => ({
    type: SEND_MESSAGE_FAILURE,
    payload: error,
});


export const seenMessageRequest = (otherId) => ({
    type: SEEN_MESSAGE_REQUEST,
    payload: {otherId},
});

export const seenMessageSuccess = (messageId) => ({
    type: SEEN_MESSAGE_SUCCESS,
    payload: messageId,
});

export const seenMessageFailure = (error) => ({
    type: SEEN_MESSAGE_FAILURE,
    payload: error,
});

export const updateMessageSuccess = (message) => (
    {
        type: UPDATE_MESSAGE_SUCCES,
        payload: message
    }
)


export const uploadFileRequest = (file) => ({
    type: UPLOAD_FILE_REQUEST,
    payload: file,
  });
  
  export const uploadFileSuccess = (response) => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: response,
  });
  
  export const uploadFileFailure = (error) => ({
    type: UPLOAD_FILE_FAILURE,
    payload: error,
  });



  export const sendFileRequest = () => ({
    type: SEND_FILE_REQUEST,
});

export const sendFileSuccess = (response) => ({
    type: SEND_FILE_SUCCESS,
    payload: response,
});

export const sendFileFailure = (error) => ({
    type: SEND_FILE_FAILURE,
    payload: error,
});



