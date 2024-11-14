import React, { useState, useRef } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import { openUserSidebar, setFullUser } from "../../../redux/actions";

//import images
import user from "../../../assets/images/users/avatar-4.jpg";
import { sendValueVideoCall } from "../../../redux/control/actions";


const UserHead = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [Callmodal, setCallModal] = useState(false);
  const [Videomodal, setVideoModal] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleCallModal = () => setCallModal(!Callmodal);
  const toggleVideoModal = () => setVideoModal(!Videomodal);

  const timeoutRef = useRef(null);

  const [isCalling, setIsCalling] = useState(false)

  const openUserSidebar = (e) => {
    e.preventDefault();
    props.openUserSidebar();
  };

  function closeUserChat(e) {
    e.preventDefault();
    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.remove("user-chat-show");
    }
  }

  function deleteMessage() {}

  // const new code
  const messageState = useSelector((state) => state.Message.messages);
  const selectedMessage = useSelector((state) => state.Control.otherId);
  const userId = useSelector((state) => state.Profile?.profile.userId);

 
  

  

  const dispatch = useDispatch();

  const otherUser = messageState.find(
    (message) => message.conversation.otherId.userId === selectedMessage
  )?.conversation?.otherId;
  console.log(otherUser);

  function generateRandomChannelName() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  async function getToken(channelName) {
    try {
      const response = await fetch(
        `http://localhost:8080/access_token?channelName=${channelName}&role=publisher&expireTime=3600`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const token = data.token; // Assign the token to a variable
      console.log("Token:", token); // Log the token to the console
      return token; // Return the token from the function
    } catch (error) {
      console.error("Error fetching token:", error);
      return null; // Return null in case of error
    }
  }


  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    return randomId + timestamp;
  };

  const roomId = handleRoomIdGenerate();

  const startVideoCall = async () => {
    setIsCalling(true)
    if (otherUser) {
      const channel = generateRandomChannelName();
      const token = await getToken(channel) + "";
      const caller = userId + "";
      const receiver = otherUser.userId + "";
      // Gửi yêu cầu POST


      fetch("https://localhost:7098/api/Stream/startvideocall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomId,
          caller: caller,
          receiver: receiver,
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
     timeoutRef.current =  setTimeout(() => {
        
        if(window.location.href !== 'http://localhost:3000/video-call'){
            console.log(window.location.href);
            window.location.href = "/";
        }
      }, 30 * 1000);
    }
  };

  const handleCancelCall = async ()=> {
    toggleVideoModal();

    if(isCalling){

      const caller = userId + "";
      const receiver = otherUser.userId + "";

      fetch("https://localhost:7098/api/Stream/cancelvideocall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomId,
          caller: caller,
          receiver: receiver,
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

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Hủy setTimeout
          timeoutRef.current = null; // Đặt về null để tránh gọi lại
        }
    }

  }

  return (
    <React.Fragment>
      <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
        <Row className="align-items-center">
          <Col sm={4} xs={8}>
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none me-2 ms-0">
                <Link
                  to="#"
                  onClick={(e) => closeUserChat(e)}
                  className="user-chat-remove text-muted font-size-16 p-2"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>
              {otherUser?.avatarUrl !== "" ? (
                <div className="me-3 ms-0">
                  <img
                    src={otherUser?.avatarUrl}
                    className="rounded-circle avatar-xs"
                    alt="chatvia"
                  />
                </div>
              ) : (
                <div className="chat-user-img align-self-center me-3">
                  <div className="avatar-xs">
                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                      {otherUser?.userName.charAt(0)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex-grow-1 overflow-hidden">
                <h5 className="font-size-16 mb-0 text-truncate">
                  {/* OPEN SIDEBAR HÊHÊ */}
                  <Link
                    to="#"
                    onClick={(e) => openUserSidebar(e)}
                    className="text-reset user-profile-show"
                  >
                    {otherUser?.fullName}
                  </Link>

                  {/* Status Online, */}
                  {(() => {
                    switch ("online") {
                      case "online":
                        return (
                          <>
                            <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-2"></i>
                          </>
                        );

                      case "away":
                        return (
                          <>
                            <i className="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                          </>
                        );

                      case "offline":
                        return (
                          <>
                            <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ms-1"></i>
                          </>
                        );

                      default:
                        return;
                    }
                  })()}
                </h5>
              </div>
            </div>
          </Col>
          <Col sm={8} xs={4}>
            <ul className="list-inline user-chat-nav text-end mb-0">
              <li className="list-inline-item">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle
                    color="none"
                    className="btn nav-btn "
                    type="button"
                  >
                    <i className="ri-search-line"></i>
                  </DropdownToggle>
                  <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-md">
                    <div className="search-box p-2">
                      <Input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Search.."
                      />
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </li>
              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  onClick={toggleCallModal}
                  className="btn nav-btn"
                >
                  <i className="ri-phone-line"></i>
                </button>
              </li>
              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  onClick={toggleVideoModal}
                  className="btn nav-btn"
                >
                  <i className="ri-vidicon-line"></i>
                </button>
              </li>

              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <Button
                  type="button"
                  color="none"
                  onClick={(e) => openUserSidebar(e)}
                  className="nav-btn user-profile-show"
                >
                  <i className="ri-user-2-line"></i>
                </Button>
              </li>

              <li className="list-inline-item">
                <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                  <DropdownToggle
                    className="btn nav-btn "
                    color="none"
                    type="button"
                  >
                    <i className="ri-more-fill"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      className="d-block d-lg-none user-profile-show"
                      onClick={(e) => openUserSidebar(e)}
                    >
                      View profile{" "}
                      <i className="ri-user-2-line float-end text-muted"></i>
                    </DropdownItem>
                    <DropdownItem>
                      Archive{" "}
                      <i className="ri-archive-line float-end text-muted"></i>
                    </DropdownItem>
                    <DropdownItem>
                      Muted{" "}
                      <i className="ri-volume-mute-line float-end text-muted"></i>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => deleteMessage(e)}>
                      Delete{" "}
                      <i className="ri-delete-bin-line float-end text-muted"></i>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      {/* Start Audiocall Modal */}
      <Modal tabIndex="-1" isOpen={Callmodal} toggle={toggleCallModal} centered>
        <ModalBody>
          <div className="text-center p-4">
            <div className="avatar-lg mx-auto mb-4">
              <img
                src={otherUser?.avatarUrl}
                alt=""
                className="img-thumbnail rounded-circle"
              />
            </div>

            <h5 className="text-truncate">{otherUser?.fullName}</h5>
            <p className="text-muted">Start Audio Call</p>

            <div className="mt-5">
              <ul className="list-inline mb-1">
                <li className="list-inline-item px-2 me-2 ms-0">
                  <button
                    type="button"
                    className="btn btn-danger avatar-sm rounded-circle"
                    onClick={toggleCallModal}
                  >
                    <span className="avatar-title bg-transparent font-size-20">
                      <i className="ri-close-fill"></i>
                    </span>
                  </button>
                </li>
                <li className="list-inline-item px-2">
                  <button
                    type="button"
                    className="btn btn-success avatar-sm rounded-circle"
                  >
                    <span className="avatar-title bg-transparent font-size-20">
                      <i className="ri-phone-fill"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* Start VideoCall Modal */}
      <Modal
        tabIndex="-1"
        isOpen={Videomodal}
        toggle={toggleVideoModal}
        centered
      >
        <ModalBody>
          <div className="text-center p-4">
            <div className="avatar-lg mx-auto mb-4">
              <img
                src={otherUser?.avatarUrl}
                alt=""
                className="img-thumbnail rounded-circle"
              />
            </div>

            <h5 className="text-truncate">{otherUser?.fullName}</h5>
            <p className="text-muted">{isCalling ? "Calling..." : "Start Video Call"}</p>

            <div className="mt-5">
              <ul className="list-inline mb-1">
                <li className="list-inline-item px-2 me-2 ms-0">
                  <button
                    type="button"
                    className="btn btn-danger avatar-sm rounded-circle"
                    onClick={() => {
                      handleCancelCall();
                    }}
                  >
                    <span className="avatar-title bg-transparent font-size-20">
                      <i className="ri-close-fill"></i>
                    </span>
                  </button>
                </li>
                <li className="list-inline-item px-2">
                  <button
                    type="button"
                    className="btn btn-success avatar-sm rounded-circle"
                    onClick={startVideoCall}
                  >
                    <span className="avatar-title bg-transparent font-size-20">
                      <i className="ri-vidicon-fill"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { users, active_user } = state.Chat;
  return { ...state.Layout, users, active_user };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(
  UserHead
);
