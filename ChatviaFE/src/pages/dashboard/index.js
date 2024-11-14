import React, { useEffect } from "react";
// Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactRequest } from "../../redux/contact/action";
import { fetchConversationRequest } from "../../redux/conversation/action";
import { fetchMessageRequest } from "../../redux/message/actions";
import { fetchProfileRequest } from "../../redux/profile/actions";
import { loginProfileRequest } from "../../redux/profile/actions";
import { loginUser } from "../../redux/actions";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { HubConnectionBuilder } from "@microsoft/signalr";
import { selectedMessage, sendStreamVideoCall, sendValueVideoCall } from "../../redux/control/actions";

import { useSignalR } from "../../routes/SignalRContext";
const Index = () => {
  const users = useSelector((state) => state.Chat.users);

  useEffect(() => {
    document.title = "Dashboard | Chatvia";
  }, []);

  const dispatch = useDispatch();

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    dispatch(fetchContactRequest());
    dispatch(fetchMessageRequest());
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  const userId = useSelector((state) => state.Profile?.profile)?.userId;

  const { sendUserId, onEvent } = useSignalR();


  useEffect(()=> {
      localStorage.setItem("userId", userId)
  },[userId])

  useEffect(() => {
    onEvent("ReceiveMessage", (msg) => {
      console.log("Message Received:", msg);
      dispatch(fetchMessageRequest());
    });
    return () => {
      if (onEvent) onEvent("ReceiveMessage", () => {});
    };
  }, [onEvent, dispatch]);

  useEffect(() => {
    onEvent("RequestCall", (message) => {

        console.log("Có cuộc gọi")
      if (message.call.receiver === userId) {
        localStorage.setItem("call", JSON.stringify(message));
        window.location.href = "/call-pending";
      }
    });
    return () => {
      if (onEvent) onEvent("RequestCall", () => {});
    };
  }, [onEvent]);

  useEffect(() => {
    onEvent("AcceptCall", (message) => {
      if (message.call.caller === userId) {
        localStorage.setItem("call", JSON.stringify(message));
        window.location.href = "/video-call";
      }
    });
    return () => {
      if (onEvent) onEvent("AcceptCall", () => {});
    };
  }, [onEvent]);

  useEffect(() => {
    onEvent("CancelCall", (message) => {
      if (message.call.caller === userId) {
        console.log("Đã từ chối");
        localStorage.setItem("call", "");
        window.location.href = "/";
      }
    });
    return () => {
      if (onEvent) onEvent("CancelCall", () => {});
    };
  }, [onEvent]);

useEffect(() => {
  onEvent("StreamStartVideoCall", (message) => {
      console.log("Dữ liệu trước khi dispatch:", message);  // Log dữ liệu gửi đi
      if (userId && message && message.receiver.userId === userId) {
          localStorage.setItem("stream", JSON.stringify(message));
          localStorage.setItem("type","receiver")
          window.location.href = "/call-pending";
          
      }
  });
}, [onEvent, dispatch, userId]);


useEffect(() => {
  onEvent("AcceptVideoCall", (message) => {
      console.log("Dữ liệu trước khi dispatch:", message);  // Log dữ liệu gửi đi
      if (userId && message && message.caller.userId === userId) {
          localStorage.setItem("stream", JSON.stringify(message));
          localStorage.setItem("type","caller")
          window.location.href = "/video-call-stream?type=one-on-one";    
      }
  });
}, [onEvent, dispatch, userId]);


useEffect(() => {
  onEvent("RefuseVideoCall", (message) => {
      if (userId && message && message.caller.userId === userId) {
          localStorage.setItem("stream", "");
          localStorage.setItem("type","caller")
          window.location.href = "/";    
      }
  });
}, [onEvent, dispatch, userId]);



  useEffect(() => {
    if (userId) {
      sendUserId(userId);
      console.log("send ", userId);
    }
  }, [userId, sendUserId]);

  // useEffect(() => {

  //     const newConnection = new HubConnectionBuilder()
  //         .withUrl("https://localhost:7098/chathub") // Đảm bảo URL trùng với backend của bạn
  //         .withAutomaticReconnect()
  //         .build();

  //     setConnection(newConnection);
  // }, []);

  // useEffect(() => {
  //     if (connection && userId) {
  //         // Định nghĩa các sự kiện nhận tin nhắn từ server

  //         // Bắt đầu kết nối và gửi userId khi kết nối thành công
  //         connection.start()
  //             .then(async () => {
  //                 console.log("Kết nối SignalR thành công!");

  //                 // Lấy Connection ID từ server
  //                 const connectionId = await connection.invoke("GetConnectionId");
  //                 console.log("Connection ID của tôi:", connectionId);

  //                 // Gửi userId đến server để lưu kèm Connection ID
  //                 await connection.invoke("StoreUserId", userId);

  //                 // Lang nghe cac su kien

  //                 connection.on("ReceiveMessage", (message) => {
  //                     console.log("Nhận tin nhắn từ server:", message);
  //                     // Xử lý tin nhắn nhận được (ví dụ: dispatch đến Redux hoặc cập nhật state)
  //                     dispatch(fetchMessageRequest());
  //                 });

  //                 connection.on("AcceptCall", (message) => {
  //                     console.log("Nhận tin nhắn từ server:", message);
  //                     // Xử lý tin nhắn nhận được (ví dụ: dispatch đến Redux hoặc cập nhật state)
  //                     // dispatch(fetchMessageRequest());
  //                     if(message.call.caller === userId){

  //                         console.log("đã chấp nhận")
  //                         localStorage.setItem('call',JSON.stringify(message));
  //                         window.location.href = '/video-call';
  //                     }
  //                 });

  //                 connection.on("CancelCall", (message) => {
  //                     console.log("Nhận tin nhắn từ server:", message);
  //                     if(message.call.caller === userId){

  //                         console.log("Đã từ chối")
  //                         localStorage.setItem('call',"");
  //                         window.location.href = '/';
  //                     }
  //                 });

  //                 connection.on("RequestCall", (message) => {
  //                     if(message.call.receiver === userId){
  //                         localStorage.setItem('call',JSON.stringify(message));
  //                         window.location.href = '/call-pending';
  //                     }
  //                 });

  //             })
  //             .catch((err) => console.error("Kết nối SignalR thất bại:", err));

  //         // Xử lý ngắt kết nối khi component unmount
  //         return () => {
  //             connection.stop().then(() => console.log("Kết nối SignalR đã được ngắt."));
  //         };
  //     }
  // }, [connection, dispatch, userId]);

  return (
    <React.Fragment>
      {/* chat left sidebar */}
      <ChatLeftSidebar recentChatList={users} />

      {/* user chat */}
      <UserChat recentChatList={users} />
    </React.Fragment>
  );
};

export default Index;
