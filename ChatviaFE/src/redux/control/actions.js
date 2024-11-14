import { SELECTED_MESSAGE, SEND_STREAM_VIDEO_CALL, SEND_VALUE_VIDEO_CALL } from "../actionTypes";

export const selectedMessage = (otherId) => (
    {
        type: SELECTED_MESSAGE,
        payload: otherId
    }
)
export const sendValueVideoCall = (channelName, token, caller, receiver) => (
    {
        type: SEND_VALUE_VIDEO_CALL,
        payload: {channelName, token,caller,receiver}
    }
)

export const sendStreamVideoCall = (message) => ({
    type: "SEND_STREAM_VIDEO_CALL",
    payload: message,
});