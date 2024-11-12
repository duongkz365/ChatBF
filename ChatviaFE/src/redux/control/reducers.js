import { act } from "react";
import { SELECTED_MESSAGE, SEND_VALUE_VIDEO_CALL } from "../actionTypes";



const initialState = {
    otherId: "",
    loading: false,
    error: null
}


const controlReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECTED_MESSAGE:
            return { ...state, loading: false, otherId: action.payload };
        case SEND_VALUE_VIDEO_CALL:
            return { ...state, loading: false, videocall: action.payload, error: null }; // Thêm error: null nếu cần
        default:
            return state;
    }
}

export default controlReducer;