import React, { useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../../assets/scss/call.css";
import { Button } from "reactstrap";
import "../../assets/scss/custom/plugins/icons/_remixicon.scss";

const VideoCall = () => {

  const joinButtonRef = useRef(null);

  const value = localStorage.getItem('call');
  if(value === ""){
    window.location.href = '/';
  }

  const callValue = JSON.parse(value);

 

  const TOKEN = callValue?.call?.token;
  const CHANNEL = callValue?.call?.channel;
  const [APP_ID, setAPP_ID] = useState('6696c4ce70d44f1ca1730089a4f474da');

  
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  let localTracks = [];
  let remoteUsers = {};

  let joinAndDisplayLocalStream = async () => {
    try {
      client.on('user-published', handleUserJoined);
      client.on('user-left', handUserLeft);
      let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
      localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      // Create video container for local stream
      const playerContainer = document.createElement("div");
      playerContainer.className = "video-container";
      playerContainer.id = `user-container-${UID}`;

      const player = document.createElement("div");
      player.className = "video-player";
      player.id = `user-${UID}`;

      playerContainer.appendChild(player);
      document.getElementById("video-streams").appendChild(playerContainer);

      localTracks[1].play(`user-${UID}`);
      await client.publish([localTracks[0], localTracks[1]]);
    } catch (error) {
      console.error("Error joining the stream:", error);
    }
  };

  let joinStream = async () => {
    await joinAndDisplayLocalStream();
    document.getElementById("join-btn").style.display = "none";
    document.getElementById("stream-controls").style.display = "flex";
  };

  let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      let playerContainer = document.getElementById(`user-container-${user.uid}`);
      if (playerContainer) {
        playerContainer.remove();
      }

      playerContainer = document.createElement("div");
      playerContainer.className = "video-container";
      playerContainer.id = `user-container-${user.uid}`;

      const player = document.createElement("div");
      player.className = "video-player";
      player.id = `user-${user.uid}`;

      playerContainer.appendChild(player);
      document.getElementById("video-streams").appendChild(playerContainer);

      user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  let handUserLeft = async (user) => {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
  };

  let leaveAndRemoveLocalStream = async () => {

    for (let i = 0; i < localTracks.length; i++) {
      localTracks[i].stop();
      localTracks[i].close();
    }
    await client.leave();
    document.getElementById('join-btn').style.display = 'block';
    document.getElementById('stream-controls').style.display = 'none';
    document.getElementById('video-streams').innerHTML = '';

    localStorage.setItem('call',"");
    window.location.href   = '/';
  };

  let toggleMic = async (e) => {
    if (localTracks[0] && localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      e.target.style.backgroundColor = '#d82e2e';
    } else {
      await localTracks[0].setMuted(true);
      e.target.style.backgroundColor = '#976a1c';
    }
  };

  let toggleCamera = async (e) => {
    if (localTracks[1]) {
      if (localTracks[1].muted) {
        await localTracks[1].setMuted(false);
        e.target.style.background = '#976a1c';
      } else {
        await localTracks[1].setMuted(true);
        e.target.style.background = '#d82e2e';
      }
    } else {
      console.error("Camera track is not available.");
    }
  };



 

  
joinStream()

  return (
    <div className="video-chat-app">
      <button id="join-btn" onClick={joinStream} ref={joinButtonRef}>
        Join Stream
      </button>
      <div id="stream-wrapper" style={{ height: "100vh", padding: "10px", background: '#c9c9c9' }}>
        <div id="video-streams"></div>

        <div id="stream-controls" style={{ display: "none" }}>
          <Button className="btn-controls" onClick={toggleMic} id="mic-btn">
            Mic
          </Button>
          <Button className="btn-controls" onClick={toggleCamera} id="camera-btn">
            Cam
          </Button>
          <Button className="btn-controls" onClick={leaveAndRemoveLocalStream} id="leave-btn">
            <i className="ri-phone-line"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
