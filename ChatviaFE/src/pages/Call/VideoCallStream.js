import React, { useRef, useState, useEffect } from "react";
import "../../assets/scss/room.css";
import {  useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSignalR } from "../../routes/SignalRContext";

// http://localhost:3000/room/z3xilx71731490868120?type=one-on-one

const VideoCallStream = () => {
  const { onEvent } = useSignalR();

  const stream = JSON.parse(localStorage.getItem("stream"));
  const type = localStorage.getItem("type");

  if (!stream || stream === null) {
    window.location.href = "/";
  }

  let myName = "";

  if(type !== ""){
     myName =  type === "caller" ? stream.caller.userName : stream.receiver.userName; 
  }

  const userId = type === "caller"? stream.caller.userId : stream.receiver.userId;

  useEffect(() => {
    onEvent("EndVideoCall", (message) => {
        if (userId && message && (message.caller.userId === userId || message.receiver.userId === userId)) {
            localStorage.setItem("stream", "");
            window.location.href = "/";    
        }
    });
  }, [onEvent,  userId]);



  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    return randomId + timestamp;
  };

  console.log(handleRoomIdGenerate());

  const APP_ID = 1264699143;
  const SECRET = "2721caae74d7e2ea073917dbb24c4deb";

  const roomId = stream.roomId;
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState(""); // State to store the call type

  // Initialize ZegoUIKit and join room on component mount
  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      myName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" +
            encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        

        fetch("https://localhost:7098/api/Stream/endvideocall", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: roomId,
            caller: stream.caller.userId,
            receiver: stream.receiver.userId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        navigate("/");

      },
    });
  };

  // Handle exit from the room
  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  // On component mount, extract call type from location and initialize meeting
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type); // Update state with call type
  }, [location.search]);

  // Initialize meeting after callType state is set
  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    // Cleanup function for component unmount
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);




  return (
    <div className="room-container">
      {!joined && (
        <>
          <header className="room-header">
            {callType === "one-on-one"
              ? "One-on-One Video Call"
              : "Group Video Call"}
          </header>
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </>
      )}
      <div ref={videoContainerRef} className="video-container" />
    </div>
  );
};

export default VideoCallStream;
