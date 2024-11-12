// src/redux/message/saga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_MESSAGE_REQUEST,
    COPY_MESSAGE_REQUEST,
    SAVE_MESSAGE_REQUEST,
    FORWARD_MESSAGE_REQUEST,
    DELETE_MESSAGE_REQUEST,
    SEND_MESSAGE_REQUEST,
    SEEN_MESSAGE_REQUEST,
    SEND_FILE_REQUEST,
} from '../actionTypes';
import {
    fetchMessageSuccess,
    fetchMessageFailure,
    copyMessageSuccess,
    copyMessageFailure,
    saveMessageSuccess,
    saveMessageFailure,
    forwardMessageSuccess,
    forwardMessageFailure,
    deleteMessageSuccess,
    deleteMessageFailure,
    fetchMessageRequest,
    sendFileFailure,
    sendFileSuccess
} from './actions';

import { getCookie } from '../actionTypes';

function* fetchMessages() {
    try {
    const response = yield call(fetch, 'https://localhost:7098/api/Message/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify(),
    });

    const data = yield response.json();

   yield console.log("Mesage data: ",data)
    yield put(fetchMessageSuccess(data));
  }catch(e){
    yield put(fetchMessageFailure(e.message));
  }
}

function* copyMessage(action) {
    try {
        // Giả sử API trả về thành công
        yield put(copyMessageSuccess(action.payload));
    } catch (error) {
        yield put(copyMessageFailure(error.message));
    }
}

function* saveMessage(action) {
    try {
        yield put(saveMessageSuccess(action.payload));
    } catch (error) {
        yield put(saveMessageFailure(error.message));
    }
}

function* forwardMessage(action) {
    try {
        yield put(forwardMessageSuccess(action.payload));
    } catch (error) {
        yield put(forwardMessageFailure(error.message));
    }
}

function* deleteMessage(action) {
    try {
        yield put(deleteMessageSuccess(action.payload));
    } catch (error) {
        yield put(deleteMessageFailure(error.message));
    }
}

function* sendMessage({payload: { receiverId, messageType, content, mediaUrl, isGroupMessage}}){
    
    const token = getCookie("token");

    try {
        if(messageType === "text"){
            const response = yield call(
                fetch,
                "https://localhost:7098/api/Message/sendtext",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({token,  receiverId, isGroupMessage,content }),
                }
              );

              if(!response.ok){
                console.log("NOT OF")
              }
              yield put({ type: "FETCH_MESSAGE_REQUEST" });
        }else if(messageType === "file"){


            yield console.log(mediaUrl)
        }else {

        }
    }catch(e){

    }
    
}


function* sendFileSaga(action) {

    console.log("send fiel sagea")
    try {

        const {  receiver, file, isgroup } = action.payload;
        yield console.log("token: ", receiver)
        // const response = yield call(fetch, 'YOUR_API_ENDPOINT/sendfile', {
        //     method: 'POST',
        //     body: action.payload, // Sử dụng FormData
        // });

        // const data = yield response.json();

        // if (response.ok) {
        //     yield put({ type: SEND_FILE_SUCCESS, payload: data });
        // } else {
        //     yield put({ type: SEND_FILE_FAILURE, payload: data });
        // }
    } catch (error) {
        // yield put({ type: SEND_FILE_FAILURE, payload: error.message });
    }
}

function* seenMessage({payload: {otherId}}){
    yield console.log("Seen Message: ", otherId)
}




export function* watchMessageActions() {
    yield takeLatest(FETCH_MESSAGE_REQUEST, fetchMessages);
    yield takeLatest(COPY_MESSAGE_REQUEST, copyMessage);
    yield takeLatest(SAVE_MESSAGE_REQUEST, saveMessage);
    yield takeLatest(FORWARD_MESSAGE_REQUEST, forwardMessage);
    yield takeLatest(DELETE_MESSAGE_REQUEST, deleteMessage);
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
    yield takeLatest(SEEN_MESSAGE_REQUEST, seenMessage);
    yield takeLatest(SEND_FILE_REQUEST,sendFileSaga);
}



