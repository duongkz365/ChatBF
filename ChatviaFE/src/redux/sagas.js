// src/redux/sagas.js
import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga'; // Import auth saga
import { watchLoginUser } from './auth/saga';
// import chatSaga from './chat/saga'; // Import chat saga
// import layoutSaga from './layout/saga'; // Import layout saga
import { watchFetchContacts } from './contact/saga';
import { watchFetchConversations } from './conversation/saga';
import { watchMessageActions } from './message/sagas';
import { watchFetchProfile } from './profile/sagas';
export default function* rootSaga() {
    yield all([
        fork(authSaga),
        watchLoginUser(), // Đăng ký watchLoginUser
        fork(watchFetchContacts),
        fork(watchFetchConversations),
        fork(watchMessageActions),
        fork(watchFetchProfile)
        // fork(chatSaga),
        // fork(layoutSaga),
    ]);
}
