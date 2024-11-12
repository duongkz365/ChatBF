// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import root reducer
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'; // Import root saga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

// Run root saga
sagaMiddleware.run(rootSaga);

// Export the store as default
export default store;

// Optionally, if you want to export configureStore, do it like this
// export { configureStore };
