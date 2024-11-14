import React, { useState } from "react";
import {
  Button,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Form,
} from "reactstrap";
import EmojiPicker from "emoji-picker-react";
import {
  sendMessageRequest,
  sendFileRequest,
  fetchMessageRequest,
} from "../../../redux/message/actions";
import { getCookie } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";

function ChatInput(props) {
  const [content, setContent] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isGroup, setIsGroup] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [fileNameInput, setFileNameInput] = useState('');

  const [imgSrc, setImgSrc] = useState(null)
  const toggle = () => setisOpen(!isOpen);

  const onEmojiClick = (event) => {
    // settextMessage(textMessage + event.emoji);
    setContent(content + event.emoji);
  };

  const dispatch = useDispatch();
  // senderId, receiverId, messageType, content, mediaUrl, isGroup

  const senderId = useSelector((state) => state.Profile.profile.userId);
  const receiverId = useSelector((state) => state.Control.otherId);

  const sendMessage = (e) => {
    e.preventDefault();

    if (file == null) {
      if (content !== "") {
        dispatch(
          sendMessageRequest(
            receiverId,
            messageType,
            content,
            mediaUrl,
            isGroup
          )
        );
        setContent("");
      }
    } else {
      if (file) {
        
        const formData = new FormData();
        formData.append("token", getCookie("token"));
        formData.append("receiver", receiverId);
        formData.append("file", file);
        formData.append("isgroup", isGroup);

        try {
          const response = fetch(
            "https://localhost:7098/api/Message/sendfile",
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) {
            throw new Error("Failed to send file");
          }
          const data = response.json();
          console.log("File sent successfully:", data);
          dispatch(fetchMessageRequest());
          
        } catch (error) {}
      }
    }

    setFile(null);
    setIsVisible(false);
  };
  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);

    const file = event.target.files[0]; // Lấy file đầu tiên từ input

    if (file) {
      setIsVisible(true)
      setFileNameInput(file.name)
        const reader = new FileReader(); // Tạo FileReader

        reader.onload = (e) => {
            setImgSrc(e.target.result); // Cập nhật state với URL hình ảnh
        };

        reader.readAsDataURL(file); // Đọc file và chuyển đổi thành URL hình ảnh
    }else {
      setFile(null);
      setIsVisible(false)
    }
  };
  const handleVisible = ()=> {
    setFile(null);
    setIsVisible(!isVisible);
  }


  function isImageFileByExtension(file) {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'];
    // Kiểm tra nếu file không phải là null hoặc undefined
    if (!file) {
        return false;
    }
    // Lấy phần mở rộng của file
    const fileExtension = file.name.split('.').pop().toLowerCase();
    // Kiểm tra xem phần mở rộng có nằm trong danh sách hợp lệ hay không
    return validExtensions.includes(fileExtension);
}

  return (
    <React.Fragment>
      <div className="chat-input-section p-3 p-lg-4 border-top mb-0 " style={{position: "relative"}}>
      {isVisible && (  <div className="modal-input-file"  
            style={{ padding: "10px",position: "absolute", top: -120, right: 50}}
            >
                    <Button 
                    onClick={handleVisible}
                    style={{background: "#e83e8c", color: "black", position: "absolute", right: -20, top: -10} }>
                    <i style={{color: "black", fontWeight: "bold"}} className="ri-close-line"></i>
                    </Button>

                   {file  ? 
                    isImageFileByExtension(file) ? 
                    <div>
                        <img alt="model" className="img-load-file" src={imgSrc} style={{width: "90px", height: "90px"}}/>
                    </div>
                    :
                    <div style={{paddingRight: 30}}>

                      {fileNameInput}
                    </div>
                   : null } 


            </div>)}
          

        <Form onSubmit={(e) => sendMessage(e)}>
          <Row className="g-0">
            <Col>
              <div>
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control form-control-lg bg-light border-light"
                  placeholder="Enter Message..."
                />
              </div>
            </Col>
            <Col xs="auto">
              <div className="chat-input-links ms-md-2">
                <ul className="list-inline mb-0 ms-0">
                  <li className="list-inline-item">
                    <ButtonDropdown
                      className="emoji-dropdown"
                      direction="up"
                      isOpen={isOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle
                        id="emoji"
                        color="link"
                        className="text-decoration-none font-size-16 btn-lg waves-effect"
                      >
                        <i className="ri-emotion-happy-line"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </DropdownMenu>
                    </ButtonDropdown>
                    <UncontrolledTooltip target="emoji" placement="top">
                      Emoji
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item input-file">
                    <Label
                      id="files"
                      className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    >
                      <i className="ri-attachment-line"></i>
                      <Input
                        onChange={(e) => handleFileChange(e)}
                        type="file"
                        name="fileInput"
                        size="60"
                      />
                    </Label>
                    <UncontrolledTooltip target="files" placement="top">
                      Attached File
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item">
                    <Button
                      type="submit"
                      color="primary"
                      className="font-size-16 btn-lg chat-send waves-effect waves-light"
                    >
                      <i className="ri-send-plane-2-fill"></i>
                    </Button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default ChatInput;
