// src/redux/contact/actions.js


import { ACCEPT_CONTACT_REQUEST, CANCEL_CONTACT_REQUEST, DELETE_CONTACT_REQUEST, FETCH_CONTACT_FAILURE, FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS, INVITE_CONTACT_FAILURE, INVITE_CONTACT_REQUEST, INVITE_CONTACT_SUCCESS, REFUSE_CONTACT_REQUEST } from '../actionTypes';

export const fetchContactRequest = () => ({
    type: FETCH_CONTACT_REQUEST
});

export const fetchContactSuccess = (contacts) => ({
    type: FETCH_CONTACT_SUCCESS,
    payload: contacts
});

export const fetchContactFailure = (error) => ({
    type: FETCH_CONTACT_FAILURE,
    payload: error
});



export const inviteContactRequest = (userName) => (
    {
        type: INVITE_CONTACT_REQUEST,
        payload: {userName}
    }
);

export const inviteContactSuccess = (contacts) => ({
    type: INVITE_CONTACT_SUCCESS,
    payload: contacts
});

export const inviteContactFailure = (error) => ({
    type: INVITE_CONTACT_FAILURE,
    payload: error
});

export const acceptContactRequest = (userId) => (
    {
        type: ACCEPT_CONTACT_REQUEST,
        payload: {userId}
    }
);

export const acceptContactSuccess = (message) => ({
    type: ACCEPT_CONTACT_REQUEST,
    payload: message
});

export const acceptContactFailure = (error) => ({
    type: ACCEPT_CONTACT_REQUEST,
    payload: error
});


export const cancelContactRequest = (userId) => (
    {
        type: CANCEL_CONTACT_REQUEST,
        payload: {userId}
    }
);

export const refuseContactRequest = (userId) => (
    {
        type: REFUSE_CONTACT_REQUEST,
        payload: {userId}
    }
)

export const deleteContactRequest = (userId) => (
    {
        type: DELETE_CONTACT_REQUEST ,
        payload: {userId}
    }
)