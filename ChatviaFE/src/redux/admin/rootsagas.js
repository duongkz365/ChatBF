import { all } from 'redux-saga/effects';
import { userSaga } from '../admin/sagas';

export default function* rootSaga() {
  yield all([userSaga()]);
}
