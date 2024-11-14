import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  InputGroup,
  List,
  Container,
  Row,
  Col,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { acceptContactRequest, cancelContactRequest, deleteContactRequest, inviteContactRequest, refuseContactRequest } from "../../../redux/contact/action";
import { selectedMessage } from "../../../redux/control/actions";
import { use } from "i18next";
import { updateMessageSuccess } from "../../../redux/message/actions";
import { fetchOtherProfileRequest } from "../../../redux/profile/actions";
const Contacts = ({ contacts: initialContacts, t }) => {
  const [modal, setModal] = useState(false);
  const [modalNoti, setModalNoti] = useState(false);
  const [modelInvi, setModalInvi] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNoti = () => setModalNoti(!modalNoti);
  const toggleInvi = () => setModalInvi(!modelInvi);

  const [invite, setInvite] = useState("");


  // GET DATA IN REDUX
  const contactState = useSelector((state) => state.Contact.contacts);

  const profileState = useSelector((state)=> state.Profile.profile)
  const dispatch = useDispatch();


  function groupByFirstLetter(arr) {
    if (Array.isArray(arr)) {
      const result = [];
      const groups = {};
      arr.forEach((user) => {
        const firstLetter = user.userName[0].toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = { group: firstLetter, children: [] };
          result.push(groups[firstLetter]);
        }
        groups[firstLetter].children.push(user);
      });
      return result;
    } else {
      return [];
    }
  }

  const contacts = contactState.contact?.contacts;

  var result = groupByFirstLetter(contacts ? contacts :contactState.contact);


  const contactRequests = contactState.contact?.contactRequests;
  const contactPendings = contactState.contact?.contactPendings;
  
  const messageState  = useSelector((state)=> state.Message.messages);
  const otherProfile = useSelector((state)=> state.Profile.otherProfile);
  const profile = useSelector((state) => state.Profile.profile);
  const selectedState = useSelector((state) => state.Control.otherId);






  // // OPEN USER CHAT IN CONTACT LIST
  // const handleOpenChat = (e, userId) => {

  //   e.preventDefault();
  //   dispatch(fetchOtherProfileRequest(userId))

  //   const hasMissingUserId = messageState.some(item => {
  //     return item?.conversation?.otherId?.userId === userId;
  //   });

  //   if(!hasMissingUserId){
    
  //     const newMessage = {
  //       conversation: {
  //           userId: profile?.userId,
  //           otherId: {
  //               avatarUrl: otherProfile?.avatarUrl,
  //               bio: otherProfile?.bio,
  //               createdAt: otherProfile?.createdAt,
  //               email: otherProfile?.email,
  //               fullName: otherProfile?.fullName,
  //               permission: otherProfile?.permission,
  //               userId: otherProfile?.userId,
  //               userName: otherProfile?.userName
  //           }
  //       },
  //       messages: []
  //   };
  //         const updatedMessages = [...messageState, newMessage];
  //   dispatch(updateMessageSuccess(updatedMessages));
  //   }


  //   document.querySelector('#pills-chat-tab').click();
    
  //   dispatch(selectedMessage(userId))
  // };

  const handleOpenChat = (e, userId) => {
    e.preventDefault();
    dispatch(fetchOtherProfileRequest(userId));
    
    // Click vào tab chat
    document.querySelector('#pills-chat-tab').click();
  
    // Cập nhật trạng thái người dùng đã chọn
    dispatch(selectedMessage(userId));
  };
  
  // Theo dõi sự thay đổi của otherProfile và thêm hội thoại mới nếu cần
  useEffect(() => {
    if (otherProfile && selectedState) {
      const hasMissingUserId = messageState.some(item => 
        item?.conversation?.otherId?.userId === selectedState
      );
  
      if (!hasMissingUserId) {
        const newMessage = {
          conversation: {
            userId: profile?.userId,
            otherId: {
              avatarUrl: otherProfile.avatarUrl,
              bio: otherProfile.bio,
              createdAt: otherProfile.createdAt,
              email: otherProfile.email,
              fullName: otherProfile.fullName,
              permission: otherProfile.permission,
              userId: otherProfile.userId,
              userName: otherProfile.userName,
            },
          },
          messages: [],
        };
        
        const updatedMessages = [...messageState, newMessage];
        dispatch(updateMessageSuccess(updatedMessages));
      }
    }
  }, [otherProfile, selectedState, messageState, dispatch]);



  // HANDLE INVITE CONTACT
  const handleInviteContact = (e) => {
    e.preventDefault();
    dispatch(inviteContactRequest(invite))
    setInvite("");
    console.log(invite);
  };


  // HANDLE ACCEPT CONTACT
  const handleAcceptContact =  (e, userId)  => {
    e.preventDefault();

    dispatch(acceptContactRequest(userId));
  }


  // HANDLE REFUSE CONTACT
  const handleRefuseContact = (e,userId) => {
    e.preventDefault();
    dispatch(refuseContactRequest(userId))
    console.log(userId);
  }

  const handleCancelContact = (e, userId) => {
    e.preventDefault();
    dispatch(cancelContactRequest(userId));
  }

  const handleDeleteContact = (e, userId) => {
      // e.preventDefault();
      e.stopPropagation();
      dispatch(deleteContactRequest(userId))
      console.log("delete", userId)
  }

  return (
    <React.Fragment>
      <div>
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="add-contact">
              {/* Button trigger modal */}
              <Button
                type="button"
                color="link"
                onClick={toggle}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-user-add-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="add-contact" placement="bottom">
              Add Contact
            </UncontrolledTooltip>
          </div>
          <div className="user-chat-nav float-end">
            <div id="notification">
              {/* Button trigger modal */}
              <Button
                type="button"
                color="link"
                onClick={toggleNoti}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-user-received-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="notification" placement="bottom">
              Notification
            </UncontrolledTooltip>
          </div>
          <div className="user-chat-nav float-end">
            <div id="invitaionsent">
              {/* Button trigger modal */}
              <Button
                type="button"
                color="link"
                onClick={toggleInvi}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-user-shared-2-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="invitaionsent" placement="bottom">
                Invitation Sent
            </UncontrolledTooltip>
          </div>
          <h4 className="mb-4">Contacts</h4>


          {/* Start Invitaion Modal */}
          <Modal isOpen={modelInvi} centered toggle={toggleInvi}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggleInvi}>
              {t("Invitation Sent")}
            </ModalHeader>
            <ModalBody className="p-4">
              <Form>
                <div>
                  <List
                    type="unstyled"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {contactPendings &&
                      contactPendings.map((child, key) => (
                        <li key={key} style={{ marginBottom: "10px" }}>
                          <Row xs="2">
                            <Col>
                              <h4 style={{ overflowX: "hidden" }}>{child.userName}</h4>
                            </Col>
                            <Col>

                              <Button 
                              onClick={(e)=> handleCancelContact(e,child.userId)}
                              color="danger"
                              >{"Cancel"}</Button>
                            </Col>
                          </Row>
                        </li>
                      ))}
                  </List>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="primary" onClick={toggleInvi}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Invitation Modal */}


          {/* Start Notification Modal */}
          <Modal isOpen={modalNoti} centered toggle={toggleNoti}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggleNoti}>
              {t("Notification")}
            </ModalHeader>
            <ModalBody className="p-4">
              <Form>
                <div>
                  <List
                    type="unstyled"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {contactRequests &&
                      contactRequests.map((child, key) => (
                        <li key={key} style={{ marginBottom: "10px" }}>
                          <Row xs="2">
                            <Col>
                              <h4 style={{ overflowX: "hidden" }}>{child.userName}</h4>
                            </Col>
                            <Col>
                              <Button
                                style={{ marginRight: "10px" }}
                                color="success"
                                onClick={(e)=>handleAcceptContact(e,child.userId)}
                              >
                                {"Accept"}
                              </Button>
                              <Button 
                              onClick={(e)=> handleRefuseContact(e,child.userId)}
                              color="danger"
                              >{"Refuse"}</Button>
                            </Col>
                          </Row>
                        </li>
                      ))}
                  </List>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="primary" onClick={toggleNoti}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Notification Modal */}

          {/* Start Add contact Modal */}
          <Modal isOpen={modal} centered toggle={toggle}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggle}>
              {t("Add Contact")}
            </ModalHeader>
            <ModalBody className="p-4">
              <Form>
                <div className="mb-4">
                  <Label className="form-label" htmlFor="addcontactemail-input">
                    {t("UserName")}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="addcontactemail-input"
                    placeholder="Enter UserName"
                    value={invite}
                    onChange={(e) => setInvite(e.target.value)}
                  />
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="link" onClick={toggle}>
                Close
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={(e) => handleInviteContact(e)}
              >
                Invite Contact
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Add contact Modal */}

          <div className="search-box chat-search-box">
            <InputGroup size="lg" className="bg-light rounded-lg">
              <Button
                color="link"
                className="text-decoration-none text-muted pr-1"
                type="button"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </Button>
              <Input
                type="text"
                className="form-control bg-light"
                placeholder={t("Search users..")}
              />
            </InputGroup>
          </div>
          {/* End search-box */}
        </div>
        {/* end p-4 */}

        {/* Start contact lists */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          id="chat-room"
          className="p-4 chat-message-list chat-group-list"
        >
          {result &&
            result.map((contact, key) => (
              <div key={key} className={key + 1 === 1 ? "" : "mt-3"}>
                <div className="p-3 fw-bold text-primary">{contact.group}</div>

                <ul className="list-unstyled contact-list">
                  {contact.children.map((child, key) => (
                    <li
                      key={key}
                      onClick={(e) => handleOpenChat(e, child.userId)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <h5 className="font-size-14 m-0">{child.userName}</h5>
                        </div>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="text-muted">
                            <i className="ri-more-2-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem>
                              {t("Share")}{" "}
                              <i className="ri-share-line float-end text-muted"></i>
                            </DropdownItem>
                            <DropdownItem>
                              {t("Block")}{" "}
                              <i className="ri-forbid-line float-end text-muted"></i>
                            </DropdownItem>
                            <DropdownItem   onClick={(e) => {
            e.stopPropagation(); // Ngăn chặn nổi bọt tại đây
            handleDeleteContact(e, child.userId);
          }}>
                              {t("Remove")}{" "}
                              <i className="ri-delete-bin-line float-end text-muted"></i>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </SimpleBar>
        {/* end contact lists */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { contacts } = state.Chat;
  return { contacts };
};

// export default Contacts;
export default connect(mapStateToProps, null)(withTranslation()(Contacts));
