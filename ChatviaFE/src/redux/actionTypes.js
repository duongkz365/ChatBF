
// ACTION TYPE

// ACTION TYPE PROFILE

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const LOGIN_PROFILE_REQUEST = "LOGIN_PROFILE_REQUEST";
export const LOGIN_PROFILE_SUCCESS = "LOGIN_PROFILE_SUCCESS";
export const LOGIN_PROFILE_FAILURE = "LOGIN_PROFILE_FAILURE";

export const REGISTER_PROFILE_REQUEST = "REGISTER_PROFILE_REQUEST";
export const REGISTER_PROFILE_SUCCESS = "REGISTER_PROFILE_SUCCESS";
export const REGISTER_PROFILE_FAILURE = "REGISTER_PROFILE_FAILURE";

export const LOGOUT_PROFILE_REQUEST = "LOGOUT_PROFILE_REQUEST";
export const LOGOUT_PROFILE_SUCCESS = "LOGOUT_PROFILE_SUCCESS";
export const LOGOUT_PROFILE_FAILURE = "LOGOUT_PROFILE_FAILURE";

export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE";


export const FETCH_OTHER_PROFILE_REQUEST = "FETCH_OTHER_PROFILE_REQUEST";
export const FETCH_OTHER_PROFILE_SUCCESS = "FETCH_OTHER_PROFILE_SUCCESS";
export const FETCH_OTHER_PROFILE_FAILURE = "FETCH_OTHER_PROFILE_FAILURE";




// ACTION TYPE CONTACT

// src/redux/contact/actionTypes.js
export const FETCH_CONTACT_REQUEST = "FETCH_CONTACT_REQUEST";
export const FETCH_CONTACT_SUCCESS = "FETCH_CONTACT_SUCCESS";
export const FETCH_CONTACT_FAILURE = "FETCH_CONTACT_FAILURE";

export const INVITE_CONTACT_REQUEST = "INVITE_CONTACT_REQUEST";
export const INVITE_CONTACT_SUCCESS = "INVITE_CONTACT_SUCCESS";
export const INVITE_CONTACT_FAILURE = "INVITE_CONTACT_FAILURE";

export const ACCEPT_CONTACT_REQUEST = "ACCEPT_CONTACT_REQUEST";
export const ACCEPT_CONTACT_SUCCESS = "ACCEPT_CONTACT_SUCCESS";
export const ACCEPT_CONTACT_FAILURE = "ACCEPT_CONTACT_FAILURE";

export const REFUSE_CONTACT_REQUEST = "REFUSE_CONTACT_REQUEST";
export const REFUSE_CONTACT_SUCCESS = "REFUSE_CONTACT_SUCCESS";
export const REFUSE_CONTACT_FAILURE = "REFUSE_CONTACT_FAILURE";

export const CANCEL_CONTACT_REQUEST = "CANCEL_CONTACT_REQUEST";
export const CANCEL_CONTACT_SUCCESS = "CANCEL_CONTACT_SUCCESS";
export const CANCEL_CONTACT_FAILURE = "CANCEL_CONTACT_FAILURE";


export const DELETE_CONTACT_REQUEST = "DELETE_CONTACT_REQUEST";
export const DELETE_CONTACT_SUCCESS = "DELETE_CONTACT_SUCCESS";
export const DELETE_CONTACT_FAILURE = "DELETE_CONTACT_FAILURE";

// ACTION TYPE MESSAGE

// src/redux/message/actionTypes.js

export const FETCH_MESSAGE_REQUEST = "FETCH_MESSAGE_REQUEST";
export const FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS";
export const FETCH_MESSAGE_FAILURE = "FETCH_MESSAGE_FAILURE";

export const COPY_MESSAGE_REQUEST = "COPY_MESSAGE_REQUEST";
export const COPY_MESSAGE_SUCCESS = "COPY_MESSAGE_SUCCESS";
export const COPY_MESSAGE_FAILURE = "COPY_MESSAGE_FAILURE";

export const SAVE_MESSAGE_REQUEST = "SAVE_MESSAGE_REQUEST";
export const SAVE_MESSAGE_SUCCESS = "SAVE_MESSAGE_SUCCESS";
export const SAVE_MESSAGE_FAILURE = "SAVE_MESSAGE_FAILURE";

export const FORWARD_MESSAGE_REQUEST = "FORWARD_MESSAGE_REQUEST";
export const FORWARD_MESSAGE_SUCCESS = "FORWARD_MESSAGE_SUCCESS";
export const FORWARD_MESSAGE_FAILURE = "FORWARD_MESSAGE_FAILURE";

export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";


export const SEEN_MESSAGE_REQUEST = "SEEN_MESSAGE_REQUEST";
export const SEEN_MESSAGE_SUCCESS = "SEEN_MESSAGE_SUCCESS";
export const SEEN_MESSAGE_FAILURE = "SEEN_MESSAGE_FAILURE";


export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';


export const SEND_FILE_REQUEST = 'SEND_FILE_REQUEST';
export const SEND_FILE_SUCCESS = 'SEND_FILE_SUCCESS';
export const SEND_FILE_FAILURE = 'SEND_FILE_FAILURE';



export const UPDATE_MESSAGE_SUCCES = "UPDATE_MESSAGE_SUCCESS";

// ACTION TYPES CONTROL

export const SELECTED_MESSAGE = "SELECTED_MESSAGE";
export const OPEN_MESSAGE_CONTACT = "OPEN_MESSAGE_CONTACT";
export const SEND_VALUE_VIDEO_CALL = "SEND_VALUE_VIDEO_CALL";





// GET COOKIE


export const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  };