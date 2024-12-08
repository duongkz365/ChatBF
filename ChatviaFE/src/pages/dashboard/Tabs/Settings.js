﻿import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  Button,
  UncontrolledDropdown,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { use } from "i18next";
import { fetchProfileRequest } from "../../../redux/profile/actions";

function Settings(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  const toggleCollapse2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };

  const toggleCollapse3 = () => {
    setIsOpen3(!isOpen3);
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen4(false);
  };

  const toggleCollapse4 = () => {
    setIsOpen4(!isOpen4);
    setIsOpen1(false);
    setIsOpen3(false);
    setIsOpen2(false);
  };

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const dispatch = useDispatch()

  const profileState = useSelector((state) => state.Profile);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleFullName, setVisibleFullname] = useState(false);
  const [visibleUserName, setVisibleUserName] = useState(false)
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");



  async function updateUser(user) {
    try {
        const response = await fetch('https://localhost:7098/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) // Convert the user object to JSON format
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message)
        window.location.href = "/";
        return result;
    } catch (error) {
        alert(error)
        throw error;
    }
}

  const handleSubmitUsername = () => {
        const user = profileState.profile;
        if(userName !== ""){
            user.userName = userName;
            updateUser(user)
        }
  };
  const handleSubmitFullName = () => {
    const user = profileState.profile;
    if(fullName !== ""){
        user.fullName = fullName;
        updateUser(user)
    }
  }

  const handleSubmitPassword = () => {
    const user = profileState.profile;

    if(oldPass === user.passwordHash && newPass === rePass){
        user.passwordHash = newPass;
        updateUser(user)
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-0">{t("Settings")}</h4>
        </div>

        <div className="text-center border-bottom p-4">
          <div className="mb-4 profile-user">
            <img
              src={profileState.profile.avatarUrl}
              className="rounded-circle avatar-lg img-thumbnail"
              alt="chatvia"
            />
            <Button
              type="button"
              color="light"
              className="avatar-xs p-0 rounded-circle profile-photo-edit"
            >
              <i className="ri-pencil-fill"></i>
            </Button>
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">
            {t(profileState.profile.fullName)}
          </h5>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="d-inline-block mb-1"
          >
            <DropdownToggle tag="a" className="text-muted pb-1 d-block">
              {t("Available")} <i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem>{t("Available")}</DropdownItem>
              <DropdownItem>{t("Busy")}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* End profile user */}

        {/* Start User profile description */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="p-4 user-profile-desc"
        >
          <div id="profile-setting-accordion" className="custom-accordion">
            <Card className="accordion-item border mb-2">
              <CustomCollapse
                title="Personal Info"
                isOpen={isOpen1}
                toggleCollapse={toggleCollapse1}
              >
                <div>
                  <p className="text-muted mb-1">{t("UserName")}</p>
                  <h5 className="font-size-14">
                    {t(profileState.profile.userName)}
                  </h5>

                  {visibleUserName || (
                    <Button
                      onClick={() => {
                        setVisibleUserName(true);
                      }}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      Edit UserName
                    </Button>
                  )}


                  {visibleUserName && (
                     <div className="model-edit-fullName">
                     <Label>
                       <Input
                         placeholder="Enter User Name"
                         value={userName}
                         onChange={(e) => setUserName(e.target.value)}
                       ></Input>
                     </Label>
                     <div
                       style={{
                         display: "flex",
                         padding: "20px 10px",
                         gap: "20px",
                       }}
                     >
                       <Button onClick={handleSubmitUsername}>Submit</Button>
                       <Button onClick={() => setVisibleUserName(false)}>
                         Cancel
                       </Button>
                     </div>
                   </div>

                  )}
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Email")}</p>
                  <h5 className="font-size-14">
                    {t(profileState.profile.email)}
                  </h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Time")}</p>
                  <h5 className="font-size-14">
                    {t(
                      new Date(profileState.profile.createdAt).toLocaleString()
                    )}
                  </h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Full Name")}</p>

                  {visibleFullName || (
                    <Button
                      onClick={() => {
                        setVisibleFullname(true);
                      }}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      Edit Full Name
                    </Button>
                  )}

                  {visibleFullName && (
                    <div className="model-edit-fullName">
                      <Label>
                        <Input
                          placeholder="Enter Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        ></Input>
                      </Label>
                      <div
                        style={{
                          display: "flex",
                          padding: "20px 10px",
                          gap: "20px",
                        }}
                      >
                        <Button onClick={handleSubmitFullName}>Submit</Button>
                        <Button onClick={() => setVisibleFullname(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Location")}</p>
                  <h5 className="font-size-14 mb-0">{t("Viet Nam")}</h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Password")}</p>

                  {visiblePassword || (
                    <Button onClick={() => setVisiblePassword(true)}>
                      Edit Password
                    </Button>
                  )}

                  {visiblePassword && (
                    <div className="modal-edit-password">
                      <Label>
                        <p className="text-muted mb-1">{t("Old Password")}</p>
                        <Input placeholder="Enter Old Password"></Input>
                      </Label>
                      <p className="text-muted mb-1">{t("New Password")}</p>
                      <Label>
                        <Input placeholder="Enter new password"></Input>
                      </Label>
                      <p className="text-muted mb-1">{t("Re-New Password")}</p>
                      <Label>
                        <Input placeholder="Re-Enter New Password"></Input>
                      </Label>
                      <div
                        style={{
                          display: "flex",
                          padding: "20px 10px",
                          gap: "20px",
                        }}
                      >
                        <Button
                            onClick={handleSubmitPassword}
                        >Submit</Button>
                        <Button onClick={() => setVisiblePassword(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CustomCollapse>
            </Card>
            {/* end profile card */}

            <Card className="accordion-item border mb-2">
              <CustomCollapse
                title="Privacy"
                isOpen={isOpen2}
                toggleCollapse={toggleCollapse2}
              >
                <div className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Profile photo")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Last seen")}
                      </h5>
                    </div>
                    <div className="ms-2">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-lastseenSwitch"
                          defaultChecked
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="privacy-lastseenSwitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Status")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Read receipts")}
                      </h5>
                    </div>
                    <div className="ms-2">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-readreceiptSwitch"
                          defaultChecked
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="privacy-readreceiptSwitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Groups")}
                      </h5>
                    </div>
                    <UncontrolledDropdown className="ms-2">
                      <DropdownToggle
                        className="btn btn-light btn-sm w-sm"
                        tag="button"
                      >
                        {t("Everyone")} <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>{t("Everyone")}</DropdownItem>
                        <DropdownItem>{t("selected")}</DropdownItem>
                        <DropdownItem>{t("Nobody")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Privacy card */}

            <Card className="accordion-item border mb-2">
              <CustomCollapse
                title="Security"
                isOpen={isOpen3}
                toggleCollapse={toggleCollapse3}
              >
                <div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        {t("Show security notification")}
                      </h5>
                    </div>
                    <div className="ms-2 me-0">
                      <div className="form-check form-switch">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="security-notificationswitch"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="security-notificationswitch"
                        ></Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Security card */}

            <Card className="accordion-item  border mb-2">
              <CustomCollapse
                title="Help"
                isOpen={isOpen4}
                toggleCollapse={toggleCollapse4}
              >
                <div>
                  <div className="py-3">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("FAQs")}
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("Contact")}
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        {t("Terms & Privacy policy")}
                      </Link>
                    </h5>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
            {/* end Help card */}
          </div>
          {/* end profile-setting-accordion */}
        </SimpleBar>
        {/* End User profile description */}
      </div>
    </React.Fragment>
  );
}

export default Settings;