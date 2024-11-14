import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProfileRequest } from "../../redux/profile/actions";
import { Col, Container, Row, List, Label, Input, Button, Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import "../../assets/scss/admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isProfileChecked, setIsProfileChecked] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  const profileState = useSelector((state) => state.Profile);
  const profile = profileState.profile;
  const loading = profileState.loading;






  // Kiểm tra sau khi loading kết thúc và profile đã được xác nhận
  useEffect(() => {
    if (loading) {
      setIsLoading(true); // Đang tải dữ liệu
    } else if (!isProfileChecked) {
      const timer = setTimeout(() => {
        if (!profile || Object.keys(profile).length === 0) {
          console.log("Không có profile, chuyển hướng...");
          navigate("/login"); // Chuyển hướng nếu không có dữ liệu
        } else {
          console.log("Dữ liệu profile sẵn sàng:", profile);
        }
        setIsLoading(false); // Đặt isLoading thành false sau khi hết thời gian
        setIsProfileChecked(true); // Đánh dấu đã kiểm tra
      }, 500); // Đợi 500ms sau khi loading kết thúc

      return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian
    }
  }, [loading, profile, isProfileChecked, navigate]);

  // Trong khi đang tải dữ liệu (setTimeout chưa kết thúc)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra sau khi hết thời gian setTimeout
  if (!profile || Object.keys(profile).length === 0) {
    return null; // Không hiển thị gì khi không có profile
  }

  // set style

  return (
    <React.Fragment>
      <div
        className="admin-container"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <header>
          <h3>ADMIN CHAT APP</h3>
        </header>
        <div className="content" style={{ flex: 1 }}>
          <Row style={{ height: "100%" }}>
            <Col className="bg-light border" xs="3">
              <List type="unstyled">
                <li className="admin-tab">
                  <a href="/admin-profile">My Profile</a>
                </li>
                <li className="admin-tab">
                  <a href="/admin-profile">Users</a>
                </li>
                <li className="admin-tab">
                  <a href="/admin-profile">Conversations</a>
                </li>
                <li className="admin-tab">
                  <a href="/admin-profile">Chat</a>
                </li>
                <li className="admin-tab">
                  <a href="/admin-profile">Statistical</a>
                </li>
              </List>
            </Col>
            <Col className="bg-light border" xs="9">
              {/* Profile */}
              {/* <div className="admin-profile-content">
                <h4>My Profile</h4>
                <div className="admin-avt">
                <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/279708688_782037032782855_3808300635601242927_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeFmEZLWHmYlR_DDKmg3r0ieBiWfBNUUOKQGJZ8E1RQ4pKBizsZFJHTVBK2gAeW1oRDLAFCFU3EAbzO-72UYhYkN&_nc_ohc=t2C9a_PZ_SAQ7kNvgGbbx_y&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=AO_Ei8Fsj0kBn4d1k22-X-N&oh=00_AYDjvq_9-NXZQV_QlsxJWmNseizJ-qjbwYlTMT-MSvENyg&oe=67388C42" alt="Description" width="150" height="150" />

                </div>
                <Label>
                  UserId
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>




                <div>
                <Label>
                  Bio
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>
                <Button>Edit Bio</Button>
                </div>

              

                <div>
                <Label>
                  UserName
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>

                <Button>Edit UserName</Button>

                </div>

                <div>
                <Label>
                  Email
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>
                <Button>Edit Email</Button>
                </div>

                <div>
                <Label>
                  Password
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>
                <Label>
                  New Password
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>
                <Label>
                  Re - New Password
                  <Input
                    placeholder="Enter User Name"
                  ></Input>
                </Label>

                <Button>Edit Password</Button>
                </div>
              </div> */}

              {/* User */}

              {/* <div className="admin-profile-users">
                  <h4> Users</h4>

                  <div>
                    <List>
                      <li>
                        <Row>
                          <Col>1</Col>
                          <Col>UserName</Col>
                          <Col>
                            <select>
                            <option>
                              Edit
                            </option>
                            <option>
                              Delete
                            </option>
                            </select>
                          </Col>
                        </Row>

                      </li>
                    </List>
                  </div>
              </div> */}

              {/* Conversation */}

              {/* Statistical */}
                
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
