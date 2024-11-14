import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchConversationSuccess,
    fetchConversationFailure,
} from './action';
import { getCookie } from './actionType';
import { FETCH_CONVERSATION_REQUEST } from './actionType';

// Hàm gọi API lấy danh sách cuộc trò chuyện
function* fetchConversations() {
    try {
        const response = yield call(fetch, 'https://localhost:7266/api/Conversation/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify(),
        });
    
        const data = yield response.json();
        yield put(fetchConversationSuccess(data));
      }catch(e){
        yield put(fetchConversationFailure(e.message));
      }
}

// Watcher Saga
export function* watchFetchConversations() {
    yield takeLatest(FETCH_CONVERSATION_REQUEST, fetchConversations);
}
