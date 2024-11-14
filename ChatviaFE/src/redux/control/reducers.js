import { act } from "react";
import { SELECTED_MESSAGE, SEND_STREAM_VIDEO_CALL, SEND_VALUE_VIDEO_CALL } from "../actionTypes";



const initialState = {
    otherId: "",
    loading: false,
    error: null,
    videoCallData: null,
}


const controlReducer = (state = initialState, action) => {

    console.log("Reducer nhận action:", action); // Thêm log ở đây
    switch(action.type){
        case SELECTED_MESSAGE:
            return { ...state, loading: false, otherId: action.payload };
        case SEND_VALUE_VIDEO_CALL:
            return { ...state, loading: false, videocall: action.payload, error: null }; // Thêm error: null nếu cần

        case "SEND_STREAM_VIDEO_CALL":
            console.log("Cập nhật videoCallData:", action.payload);
            return {
                ...state, 
                loading: false,
                videoCallData: action.payload,
                error: null
            }
        default:
            return state;
    }
}

export default controlReducer;