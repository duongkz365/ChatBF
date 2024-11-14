import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useSignalR } from "../../routes/SignalRContext";

const CallPending = () => {

    const {onEvent } = useSignalR();

    const [isCall, setIsCall] = useState(false);

    const stream = JSON.parse(localStorage.getItem('stream'));

    if(!stream){
        window.location.href = '/';
    }
      
    const userId = localStorage.getItem("userId");


    useEffect(() => {
        onEvent("CancelVideoCall", (message) => {
            if (userId && message && message.receiver.userId === userId) {
                localStorage.setItem("stream", "");
                window.location.href = "/";    
            }
        });
      }, [onEvent, userId]);
    const handleAccept = ()=> {


        // fetch SERVER

        fetch("https://localhost:7098/api/Stream/acceptvideocall", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roomId: stream.roomId,
              caller: stream.caller.userId,
              receiver: stream.caller.userId,
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
        // //Navigate
        window.location.href = '/video-call-stream?type=one-on-one'
    }

    const handleCancel = ()=> {
        fetch("https://localhost:7098/api/Stream/refusevideocall", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roomId: stream.roomId,
              caller: stream.caller.userId,
              receiver: stream.caller.userId,
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

        localStorage.setItem("stream", "");
        window.location.href = '/'
    }




    return (
        <div className="call-pending" style={
            {display: "flex",
             justifyContent: 'center',
              alignItems: 'center',
              width: "100%",
               height: "100vh",
                background: "#C0C0C0",
                
                }}>
            <div 
            className="pending-container"
            style={
                {background: "white",
                     padding: "40px",
                      display: "flex",
                       flexDirection: "column",
                        alignItems: 'center',
                        borderRadius: "20px"
                    }}
            >
                    <h2 className="pending Name">
                        {/* {callValue.caller.fullName} */}
                    </h2>
                    <p>Calling...</p>


                    <div className="pending-controls"
                        style={{display: "flex", gap: "10px"}}  
                    >
                      {!isCall &&   <Button onClick={handleAccept}>Nghe Máy</Button> }
                        <Button onClick={handleCancel}>Hủy</Button>
                    </div>
            </div>
        </div>
    )
}

export default CallPending;