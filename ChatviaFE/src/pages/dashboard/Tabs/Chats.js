import React, { useState, useEffect } from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

// simplebar
import SimpleBar from "simplebar-react";

// actions
import {
  setconversationNameInOpenChat,
  activeUser,
} from "../../../redux/actions";

// components
import OnlineUsers from "./OnlineUsers";
import { selectedMessage } from "../../../redux/control/actions";

const Chats = (props) => {
  const [searchChat, setSearchChat] = useState("");
  const [recentChatList, setRecentChatList] = useState(props.recentChatList);
  const dispatch = useDispatch();
  const active_user = useSelector((state) => state.Chat.active_user);

  useEffect(() => {
    setRecentChatList(props.recentChatList);
  }, [props.recentChatList]);

  useEffect(() => {
    const li = document.getElementById("conversation" + active_user);
    if (li) {
      li.classList.add("active");
    }
  }, [active_user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchChat(value);

    const filteredArray = props.recentChatList.filter((chat) =>
      chat.name.toLowerCase().includes(value.toLowerCase())
    );

    setRecentChatList(value === "" ? props.recentChatList : filteredArray);
  };

  const openUserChat = (e, chat) => {
    e.preventDefault();

    // Find index of current chat in array
    const index = props.recentChatList.indexOf(chat);

    // Set activeUser
    dispatch(activeUser(index));

    const chatList = document.getElementById("chat-list");
    const clickedItem = e.target;

    // Remove active class from other conversations
    const liItems = chatList.getElementsByTagName("li");
    Array.from(liItems).forEach((li) => li.classList.remove("active"));

    // Activate clicked conversation user
    const currentli = Array.from(liItems).find((li) =>
      li.contains(clickedItem)
    );
    if (currentli) {
      currentli.classList.add("active");
    }

    const userChat = document.getElementsByClassName("user-chat");
    if (userChat.length > 0) {
      userChat[0].classList.add("user-chat-show");
    }

    // Remove unread badge if user clicks
    const unread = document.getElementById("unRead" + chat.id);
    if (unread) {
      unread.style.display = "none";
    }
  };

  // Code new

  // USE STATE

  const [activeIndex, setActiveIndex] = useState(null);

  

  const messageState = useSelector((state) => state.Message.messages);
  const profileState = useSelector((state) => state.Profile.profile);
  const selectedState = useSelector((state)=> state.Control.otherId);


  function countSentMessages(messages) {
    return messages.filter((message) => message.status === "sent" && message.senderId !== profileState.userId).length;
  }

  const selectedChat = (e, chat) => {
    e.preventDefault();
    dispatch(selectedMessage(chat.conversation.otherId.userId))
  };

  function formatTimeDifference(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const diffMs = currentDate - inputDate; // chênh lệch tính bằng milliseconds
    // Chuyển đổi sang các đơn vị thời gian
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    // Kiểm tra điều kiện và trả về chuỗi tương ứng
    if (diffMinutes < 60) {
      return `${diffMinutes} minute ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour ago`;
    } else if (diffDays < 5) {
      return `${diffDays} day ago`;
    } else {
      // Nếu trên 5 ngày, trả về ngày tháng năm ban đầu
      return inputDate.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-4">Chats</h4>
          <div className="search-box chat-search-box">
            <InputGroup className="mb-3 rounded-3">
              <span
                className="input-group-text text-muted bg-light pe-1 ps-3"
                id="basic-addon1"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </span>
              <Input
                type="text"
                value={searchChat}
                onChange={handleChange}
                className="form-control bg-light"
                placeholder="Search messages or users"
              />
            </InputGroup>
          </div>
        </div>

        {/* Online users */}
        <OnlineUsers />
        {/* Start chat-message-list  */}
        <div>
          <h5 className="mb-3 px-3 font-size-16">Recent</h5>
          <SimpleBar className="chat-message-list">
            <ul
              className="list-unstyled chat-list chat-user-list px-2"
              id="chat-list"
            >
              {messageState &&
                messageState.map((chat, key) => (
                  <li
                    key={key}
                    id={"conversation" + key}

                    className={chat?.conversation?.otherId?.userId  === activeIndex? "active" : ""}
                    onClick={() => setActiveIndex(chat?.conversation?.otherId?.userId)}
                  >
                    <Link to="#" onClick={(e) => selectedChat(e, chat)}>
                      <div className="d-flex">
                        {chat.profilePicture === "Null" ? (
                          <div
                            className={
                              "chat-user-img " +
                              chat.status +
                              " align-self-center me-1 ms-0"
                            }
                          >
                            <div className="avatar-xs">
                              <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                {chat.name.charAt(0)}
                              </span>
                            </div>
                            {chat.status && (
                              <span className="user-status"></span>
                            )}
                          </div>
                        ) : (
                          <div
                            className={
                              "chat-user-img " +
                              chat.status +
                              " align-self-center me-1 ms-0"
                            }
                          >
                            <img
                              src={chat?.conversation?.otherId?.avatarUrl}
                              className="rounded-circle avatar-xs"
                              alt="chatvia"
                            />
                            {chat.status && (
                              <span className="user-status"></span>
                            )}
                          </div>
                        )}

                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="text-truncate font-size-15 mb-1 ms-3">
                            {chat.conversation?.otherId?.fullName}
                          </h5>
                          <p className="chat-user-message font-size-14 text-truncate mb-0 ms-3" style={{color: "black"}}>
                            {chat?.messages[chat.messages.length - 1]
                              ?.senderId === profileState.userId
                              ? chat?.messages[chat.messages.length - 1]
                                  ?.messageType === "file"
                                ? "You have sent a file"
                                : chat?.messages[chat.messages.length - 1]
                                    ?.messageType === "image"
                                ? "You have sent an image"
                                : "You: " +
                                  chat?.messages[chat.messages.length - 1]
                                    ?.content
                              : chat?.messages[chat.messages.length - 1]
                                  ?.content}

                            {chat.isTyping ? (
                              <>
                                typing
                                <span className="animate-typing">
                                  <span className="dot ms-1"></span>
                                  <span className="dot ms-1"></span>
                                  <span className="dot ms-1"></span>
                                </span>
                              </>
                            ) : (
                              <>
                                {chat.messages &&
                                chat.messages.length > 0 &&
                                chat.messages[chat.messages.length - 1]
                                  .isImageMessage === true ? (
                                  <i className="ri-image-fill align-middle me-1"></i>
                                ) : null}
                                {chat.messages &&
                                chat.messages.length > 0 &&
                                chat.messages[chat.messages.length - 1]
                                  .isFileMessage === true ? (
                                  <i className="ri-file-text-fill align-middle me-1"></i>
                                ) : null}
                                {chat.messages && chat.messages.length > 0
                                  ? chat.messages[chat.messages.length - 1]
                                      .message
                                  : null}
                              </>
                            )}
                          </p>
                        </div>
                        <div className="font-size-11" style={{color: "black"}}>
                          {chat?.messages[chat.messages.length - 1]?.sentAt &&
                            formatTimeDifference(
                              chat?.messages[chat.messages.length - 1]?.sentAt
                            )}
                        </div>
                        {chat.unRead === 0 ? null : (
                          <div
                            className="unread-message"
                            id={"unRead" + chat.id}
                          >
                            <span className="badge badge-soft-danger rounded-pill">
                              {chat?.messages?.length > 0 &&
                                countSentMessages(chat.messages) > 0 && countSentMessages(chat.messages)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </SimpleBar>
        </div>
        {/* End chat-message-list */}

      </div>
    </React.Fragment>
  );
};

export default connect(null, { setconversationNameInOpenChat, activeUser })(
  Chats
);
