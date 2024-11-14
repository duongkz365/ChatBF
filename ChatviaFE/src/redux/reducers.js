import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Chat from './chat/reducers';
import Layout from './layout/reducer';
import contactReducer from './contact/reducer';
import conversationReducer from './conversation/reducer';
import messageReducer from './message/reducers';
import profileReducer from './profile/reducers';

import controlReducer from './control/reducers';
export default combineReducers({
    Auth: Auth,
    Chat: Chat,
    Layout: Layout,
    Contact: contactReducer,
    Conversation: conversationReducer,
    Message: messageReducer,
    Profile: profileReducer,
    Control: controlReducer
});