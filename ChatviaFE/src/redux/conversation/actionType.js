export const FETCH_CONVERSATION_REQUEST = 'FETCH_CONVERSATION_REQUEST';
export const FETCH_CONVERSATION_SUCCESS = 'FETCH_CONVERSATION_SUCCESS';
export const FETCH_CONVERSATION_FAILURE = 'FETCH_CONVERSATION_FAILURE';


export const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  };
