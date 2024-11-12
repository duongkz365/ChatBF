import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const CallPending = () => {


    const profileState = useSelector((state)=> state.Profile)

    console.log(profileState)

    const [isCall, setIsCall] = useState(false);
    const callValue = JSON.parse( localStorage.getItem('call'));
    console.log(useSelector);


    const handleAccept = ()=> {


        // fetch SERVER

        fetch("https://localhost:7098/api/Agora/accept", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: callValue.call.token,
              channel: callValue.call.channel,
              caller: callValue.call.caller,
              receiver: callValue.call.receiver,
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


        //Navigate
        window.location.href = '/video-call'
    }

    const handleCancel = ()=> {

        fetch("https://localhost:7098/api/Agora/cancel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: callValue.call.token,
              channel: callValue.call.channel,
              caller: callValue.call.caller,
              receiver: callValue.call.receiver,
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
                        {callValue.caller.fullName}
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