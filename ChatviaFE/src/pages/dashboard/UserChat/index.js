
import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Button,
  ModalFooter,
} from "reactstrap";
import { connect, useSelector } from "react-redux";

import SimpleBar from "simplebar-react";

import withRouter from "../../../components/withRouter";

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from "react-i18next";

import "../../../assets/scss/test.css";

function UserChat(props) {
  const ref = useRef();

  const [modal, setModal] = useState(false);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  //demo conversation messages
  //userType must be required
  const [allUsers] = useState(props.recentChatList);
  const [chatMessages, setchatMessages] = useState(
    props.recentChatList[props.active_user].messages
  );

  useEffect(() => {
    setchatMessages(props.recentChatList[props.active_user].messages);
    // ref.current.recalculate();
    // if (ref.current.el) {
    //     ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
    // }
  }, [props.active_user, props.recentChatList]);

  const toggle = () => setModal(!modal);

  const addMessage = (message, type) => {
    var messageObj = null;

    let d = new Date();
    var n = d.getSeconds();

    //matches the message type is text, file or image, and create object according to it
    switch (type) {
      case "textMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: message,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isFileMessage: false,
          isImageMessage: false,
        };
        break;

      case "fileMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: "file",
          fileMessage: message.name,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isFileMessage: true,
          isImageMessage: false,
        };
        break;

      case "imageMessage":
        var imageMessage = [{ image: message }];

        messageObj = {
          id: chatMessages.length + 1,
          message: "image",
          imageMessage: imageMessage,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isImageMessage: true,
          isFileMessage: false,
        };
        break;

      default:
        break;
    }

    //add message object to chat
    setchatMessages([...chatMessages, messageObj]);

    let copyallUsers = [...allUsers];
    copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
    copyallUsers[props.active_user].isTyping = false;
    props.setFullUser(copyallUsers);

    scrolltoBottom();
  };

  function scrolltoBottom() {
    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }
  }

  const deleteMessage = (id) => {
    let conversation = chatMessages;

    var filtered = conversation.filter(function (item) {
      return item.id !== id;
    });

    setchatMessages(filtered);
  };

  const dataArray = [
    {
      conversation: {
        userId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
        otherId: {
          userId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          userName: "username13",
          email: "email@gmail.com1",
          avatarUrl:
            "https://localhost:7266/uploads/ab69ecb7-9541-4562-8507-11995089cc9c_Screenshot%202024-08-06%20220146.png",
          bio: "This is my bio",
          createdAt: "2024-10-27T13:59:35.514Z",
          fullName: "email@gmail.com1",
          permission: "user",
        },
      },
      messages: [
        {
          id: {
            timestamp: 1730117604,
            creationTime: "2024-10-28T12:13:24Z",
          },
          senderId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          receiverId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          content: "Hello, how are you?",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-22T10:30:00Z",
          readAt: "2024-10-22T10:32:00Z",
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1730117604,
            creationTime: "2024-10-28T12:13:24Z",
          },
          senderId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          receiverId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          content: "I am fine, thank you!",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-22T10:35:00Z",
          readAt: "2024-10-22T10:36:00Z",
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1730117604,
            creationTime: "2024-10-28T12:13:24Z",
          },
          senderId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          receiverId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          content: "What are you up to today?",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-22T10:40:00Z",
          readAt: null,
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1730275698,
            creationTime: "2024-10-30T08:08:18Z",
          },
          senderId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          receiverId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          content: "Tôi Không khỏe bạn khỏe không không :v",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-30T08:08:18.228Z",
          readAt: null,
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1730276140,
            creationTime: "2024-10-30T08:15:40Z",
          },
          senderId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          receiverId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          content: "Tôi Không khỏe bạn khỏe không không :v",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-30T08:15:40.2Z",
          readAt: null,
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1730276395,
            creationTime: "2024-10-30T08:19:55Z",
          },
          senderId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          receiverId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          content: "Tôi đây",
          messageType: "text",
          mediaUrl: null,
          sentAt: "2024-10-30T08:19:55.574Z",
          readAt: null,
          status: "sent",
          isGroupMessage: false,
        },
        {
          id: {
            timestamp: 1729757161,
            creationTime: "2024-10-24T08:06:01Z",
          },
          senderId: "2e6c7ba8-b5db-44dc-b0dc-8cec6f6a8165",
          receiverId: "d41fc8b7-589b-4b43-8daf-6031e8d6d608",
          content:
            "5c063a69-de56-441a-a315-4759af37f1fb_Screenshot 2024-08-06 220146.png",
          messageType: "image",
          mediaUrl:
            "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/279730753_1674149106267314_2460136207078036044_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeF_y8iPX07KS55lq59v1iPJbylYTCXb3e1vKVhMJdvd7cPoaaUlGp0KVrSzdXMT-ir4go9OdXWqjETUmWCCRdT6&_nc_ohc=FQD8XpZ79XAQ7kNvgFic8PZ&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=A6z6vrg8rgwDi640XVGghzW&oh=00_AYCtHGctPpWxjcFLaCdS__uu1GMgVXtiRQqvKfSDQdKqSA&oe=672C01EB",
          sentAt: "2024-10-24T08:06:01.068Z",
          readAt: null,
          status: "sent",
          isGroupMessage: false,
        },
      ],
    },
  ];

  const selectedState = useSelector((state)=> state.Control?.otherId);
  const messageState = useSelector((state)=> state.Message?.messages);
  const profileState = useSelector((state)=> state.Profile?.profile)

  console.log(profileState)
  const otherProfileState = messageState.find(message => message?.conversation?.otherId?.userId === selectedState)?.conversation?.otherId;
  console.log(otherProfileState)

  var messageOtherUser = messageState.find(message => message?.conversation?.otherId?.userId === selectedState);


  const mess = [messageOtherUser];
  

  const bottomRef = useRef(null);
  useEffect(() => {
      // Cuộn đến phần tử cuối cùng khi danh sách tin nhắn thay đổi
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, [messageState, selectedState]);
    if(!selectedState){
      return (
        <div></div>
      )
    }

    function getFileName(url) {
      // Biểu thức chính quy để tìm GUID với phần tên file theo sau dấu gạch dưới
      const regex = /.*[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}_(.+)$/;
      const match = url.match(regex);
      
      // Nếu có GUID, lấy phần tên file sau GUID
      // Nếu không có GUID, lấy phần cuối cùng của URL
      return match ? match[1] : url.split('/').pop();
  }

  return (
    <React.Fragment>
      <div className="user-chat w-100 overflow-hidden">
        <div className="d-lg-flex">
          <div
            className={
              props.userSidebar
                ? "w-70 overflow-hidden position-relative"
                : "w-100 overflow-hidden position-relative"
            }
          >
            {/* render user head */}
            <UserHead />
            <SimpleBar id="messages" className="chat-conversation p-5 p-lg-4" style={{background: "#d4d4d4"}}>
              <div
                className="chat-container"
                style={{
                  maxHeight: "100%",
                  overflowY: "auto",
                  padding: "1rem",
                }}
              >
                <ul className="chat-list">
                  {mess && mess.map((item, index) => (
                    <li key={index} className="chat-item">
                      <div className="conversation-list">
                        <div className="user-chat-content">
                          {/* Hiển thị tin nhắn */}
                          <ul className="message-list">
                            {item?.messages.map((message, msgIndex) => {
                              // Sử dụng senderId hoặc receiverId làm tên người gửi
                            

                              return (
                                <li
                                  key={msgIndex}
                                  className={`message-item ${
                                    message.senderId ===
                                    item.conversation.userId
                                      ? "sender"
                                      : "receiver"
                                  }`}
                                >
                                  <div className="ctext-wrap">
                                    {message.senderId ===
                                    item.conversation.userId ? (
                                      ""
                                    ) : (
                                      <div className="message-avatar">
                                        {/* Avatar cố định cho mỗi tin nhắn, kích thước 80x80 */}
                                        <img
                                          src={otherProfileState?.avatarUrl}
                                          alt="message-avatar"
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </div>
                                    )}

                                    <div
                                      className={`ctext-wrap-content ${
                                        message.senderId ===
                                        item.conversation.userId
                                          ? "receiverh"
                                          : "senderh"
                                      }`}
                                    >
                                      {/* Tên người gửi */}
                                      <p className="sender-name">
                                        {message.senderId === profileState?.userId  ? profileState.userName : otherProfileState?.userName}
                                      </p>

                                      {/* Nội dung tin nhắn */}
                                      {message.messageType === "text" && (
                                        <p>{message.content}</p>
                                      )}
                                      {message.messageType === "file" && (
                                        <div className="file-message">
                                          <a
                                            href={message.mediaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {getFileName(message.mediaUrl)}
                                            
                                          </a>
                                        </div>
                                      )}

                                      {message.messageType === "image" && (
                                        <div className="image-message">
                                          <a
                                           href={message.mediaUrl}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                          >

                                          <img
                                            style={{
                                              maxWidth: "500px",
                                              maxHeight: "500px",
                                            }}
                                            src={message.mediaUrl}
                                            alt={message.content}
                                            className="message-image"
                                          />
                                          </a>
                                        </div>
                                      )}

                                      {/* Thời gian gửi */}
                                      <span className="chat-time">
                                        <i className="ri-time-line"></i>{" "}
                                        {new Date(
                                          message.sentAt
                                        ).toLocaleTimeString()}
                                      </span>
                                    </div>
                                    {message.senderId ===
                                    item.conversation.userId ? (
                                      <div className="message-avatar">
                                        {/* Avatar cố định cho mỗi tin nhắn, kích thước 80x80 */}
                                        <img
                                          src={profileState?.avatarUrl}
                                          alt="message-avatar"
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}


                  {/* Cuộn xuống tới đây */}

                  <div ref={bottomRef} />
                </ul>
              </div>
            </SimpleBar>

            <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
              <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
              <ModalBody>
                <CardBody className="p-2">
                  <SimpleBar style={{ maxHeight: "200px" }}>
                    <SelectContact handleCheck={() => {}} />
                  </SimpleBar>
                  <ModalFooter className="border-0">
                    <Button color="primary">Forward</Button>
                  </ModalFooter>
                </CardBody>
              </ModalBody>
            </Modal>

            <ChatInput onaddMessage={addMessage} />
          </div>

          <UserProfileSidebar
            activeUser={props.recentChatList[props.active_user]}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { active_user } = state.Chat;
  const { userSidebar } = state.Layout;
  return { active_user, userSidebar };
};

export default withRouter(
  connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat)
);
