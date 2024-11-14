// SignalRContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext();

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7098/chathub") // Thay URL của bạn vào đây
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection.start()
            .then(() => console.log("Connect SignalR Success!!"))
            .catch(err => console.error("Connect SignalR Fail!:", err));

        return () => {
            newConnection.stop();
        };
    }, []);


    const sendUserId = async (userId) => {
        if (connection) {
            try {
                await connection.invoke("StoreUserId", userId);
                console.log("Send UserId Success:", userId);
            } catch (err) {
                console.error("Send UserId Fail:", err);
            }
        }
    };

    const onEvent = (eventName, callback) => {
        if (connection) {
            connection.on(eventName, callback);
        }
    };

    return (
        <SignalRContext.Provider value={{connection, sendUserId, onEvent}}>
            {children}
        </SignalRContext.Provider>
    );
};
