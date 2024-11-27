import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, UncontrolledTooltip, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setActiveTab, changeLayoutMode } from "../../redux/actions";

// Import Images
import logo from "../../assets/images/logo.svg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";

// i18n
import i18n from '../../i18n';

// Flags
import usFlag from "../../assets/images/flags/us.jpg";
import spain from "../../assets/images/flags/spain.jpg";
import germany from "../../assets/images/flags/germany.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import russia from "../../assets/images/flags/russia.jpg";

function LeftSidebarMenu({ activeTab, setActiveTab }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const profileState = useSelector((state) => state.Profile.profile);
    const layoutMode = useSelector((state) => state.Layout.layoutMode);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
    const [lng, setLng] = useState("English");

    const mode = layoutMode === "dark" ? "light" : "dark";

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    const toggleMobile = () => setDropdownOpenMobile(!dropdownOpenMobile);

    const onChangeLayoutMode = (value) => {
        dispatch(changeLayoutMode(value));
    };

    const changeLanguageAction = (language) => {
        i18n.changeLanguage(language);
        const languageMap = {
            sp: "Spanish",
            gr: "German",
            rs: "Russian",
            it: "Italian",
            eng: "English",
        };
        setLng(languageMap[language] || "English");
    };

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <React.Fragment>
            <div className="side-menu flex-lg-column me-lg-1">
                {/* LOGO */}
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logo} alt="logo" height="30" />
                        </span>
                    </Link>

                    <Link to="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logo} alt="logo" height="30" />
                        </span>
                    </Link>
                </div>
                {/* End navbar-brand-box */}

                {/* Start side-menu nav */}
                <div className="flex-lg-column my-auto">
                    <Nav className="side-menu-nav nav-pills justify-content-center" role="tablist">
                        <NavItem id="profile">
                            <NavLink
                                id="pills-user-tab"
                                className={classnames({ active: activeTab === 'profile' }) + " mb-2"}
                                onClick={() => toggleTab('profile')}
                            >
                                <i className="ri-user-2-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="profile" placement="top">
                            Profile
                        </UncontrolledTooltip>

                        <NavItem id="Chats">
                            <NavLink
                                id="pills-chat-tab"
                                className={classnames({ active: activeTab === 'chat' }) + " mb-2"}
                                onClick={() => toggleTab('chat')}
                            >
                                <i className="ri-message-3-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Chats" placement="top">
                            Chats
                        </UncontrolledTooltip>

                        <NavItem id="Groups">
                            <NavLink
                                id="pills-groups-tab"
                                className={classnames({ active: activeTab === 'group' }) + " mb-2"}
                                onClick={() => toggleTab('group')}
                            >
                                <i className="ri-group-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Groups" placement="top">
                            Groups
                        </UncontrolledTooltip>

                        <NavItem id="Contacts">
                            <NavLink
                                id="pills-contacts-tab"
                                className={classnames({ active: activeTab === 'contacts' }) + " mb-2"}
                                onClick={() => toggleTab('contacts')}
                            >
                                <i className="ri-contacts-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Contacts" placement="top">
                            Contacts
                        </UncontrolledTooltip>

                        <NavItem id="Settings">
                            <NavLink
                                id="pills-setting-tab"
                                className={classnames({ active: activeTab === 'settings' })}
                                onClick={() => toggleTab('settings')}
                            >
                                <i className="ri-settings-2-line"></i>
                            </NavLink>
                        </NavItem>
                        <UncontrolledTooltip target="Settings" placement="top">
                            Settings
                        </UncontrolledTooltip>

                        <Dropdown nav isOpen={dropdownOpenMobile} toggle={toggleMobile} className="profile-user-dropdown d-inline-block d-lg-none dropup">
                            <DropdownToggle nav>
                                <img src={avatar1} alt="chatvia" className="profile-user rounded-circle" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => toggleTab('profile')}>Profile</DropdownItem>
                                <DropdownItem onClick={() => toggleTab('settings')}>Setting</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/logout">Log out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
                {/* end side-menu nav */}

                {/* Language and mode toggler */}
                <div className="flex-lg-column d-none d-lg-block">
                    <Nav className="side-menu-nav justify-content-center">
                        <Dropdown nav isOpen={dropdownOpen2} className="btn-group dropup profile-user-dropdown" toggle={toggle2}>
                            <DropdownToggle nav>
                                <i className="ri-global-line"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changeLanguageAction('eng')} active={lng === "English"}>
                                    <img src={usFlag} alt="user" className="me-1" height="12" /> <span className="align-middle">English</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('sp')} active={lng === "Spanish"}>
                                    <img src={spain} alt="user" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('gr')} active={lng === "German"}>
                                    <img src={germany} alt="user" className="me-1" height="12" /> <span className="align-middle">German</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('it')} active={lng === "Italian"}>
                                    <img src={italy} alt="user" className="me-1" height="12" /> <span className="align-middle">Italian</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('rs')} active={lng === "Russian"}>
                                    <img src={russia} alt="user" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <li className="nav-item">
                            <NavLink id="light-dark" className="mb-2" onClick={() => onChangeLayoutMode(mode)}>
                                <i className="ri-sun-line theme-mode-icon"></i>
                            </NavLink>
                            <UncontrolledTooltip target="light-dark" placement="right">
                                Dark / Light Mode
                            </UncontrolledTooltip>
                        </li>

                        <Dropdown nav isOpen={dropdownOpen} className="nav-item btn-group dropup profile-user-dropdown" toggle={toggle}>
                            <DropdownToggle className="nav-link mb-2" tag="a">
                                <img src={profileState?.avatarUrl} alt="" className="profile-user rounded-circle" />
                            </DropdownToggle>
                            <DropdownMenu>
                                
                                {profileState?.permission === 'admin' && (
                                    <DropdownItem onClick={() => navigate('/admin')}>Admin <i className="ri-admin-line float-end text-muted"></i></DropdownItem >
                                )}
                                <DropdownItem divider />
                                <DropdownItem href="/logout">Log out  <i className="ri-logout-box-line float-end text-muted"></i></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
                {/* End Language and mode toggler */}
            </div>
        </React.Fragment>
    );
}

export default connect((state) => ({
    activeTab: state.Layout.activeTab
}), { setActiveTab })(LeftSidebarMenu);
