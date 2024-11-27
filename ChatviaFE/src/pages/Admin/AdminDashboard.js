import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0); // Số lượng người dùng
  const [groupCount, setGroupCount] = useState(0); // Số lượng nhóm chat
  const [messageCount, setMessageCount] = useState(0); // Số lượng tin nhắn
  const [recentMessages, setRecentMessages] = useState([]); // Tin nhắn gần đây
  const [onlineUsers, setOnlineUsers] = useState([]); // Người dùng trực tuyến

  // Fetch user count from the API
  const fetchUserCount = async () => {
    try {
      const response = await fetch('https://localhost:7098/api/Admin/count'); // API endpoint for getting user count
      const data = await response.json();
      setUserCount(data.count); // Update user count from the API response
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  useEffect(() => {
    fetchUserCount(); // Fetch user count when the component mounts

    // Fake data for other counts (this can be replaced with real API calls)
    setGroupCount(10);
    setMessageCount(300);
    setRecentMessages([
      { id: 1, sender: 'User1', content: 'Hello!', time: '2 mins ago' },
      { id: 2, sender: 'User2', content: 'Hi there!', time: '5 mins ago' },
    ]);
    setOnlineUsers([
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ]);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9" style={{ marginLeft: '250px', width: '81%' }}>
          <Header title="Admin Dashboard" />
          
          <div className="container-fluid mt-4">
            <div className="row">
              {/* Tổng Số Người Dùng */}
              <div className="col-md-4 mb-4">
                <div className="card text-white bg-primary shadow">
                  <div className="card-body">
                    <h5 className="card-title">Số Người Dùng</h5>
                    <p className="card-text" style={{ fontSize: '1.5rem' }}>{userCount}</p>
                  </div>
                </div>
              </div>

              {/* Tổng Số Nhóm Chat */}
              <div className="col-md-4 mb-4">
                <div className="card text-white bg-info shadow">
                  <div className="card-body">
                    <h5 className="card-title">Số Nhóm Chat</h5>
                    <p className="card-text" style={{ fontSize: '1.5rem' }}>{groupCount}</p>
                  </div>
                </div>
              </div>

              {/* Tổng Số Tin Nhắn */}
              <div className="col-md-4 mb-4">
                <div className="card text-white bg-success shadow">
                  <div className="card-body">
                    <h5 className="card-title">Số Tin Nhắn</h5>
                    <p className="card-text" style={{ fontSize: '1.5rem' }}>{messageCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Danh Sách Tin Nhắn Gần Đây
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Tin Nhắn Gần Đây</h5>
                    <ul className="list-group list-group-flush"> */}
                      {/* {recentMessages.map(message => (
                        <li className="list-group-item" key={message.id}>
                          <strong>{message.sender}</strong>: {message.content} <span className="text-muted">({message.time})</span>
                        </li>
                      ))} */}
                    {/* </ul> */}
                  {/* </div>
                </div>
              </div> */}

              {/* Danh Sách Người Dùng Trực Tuyến */}
              {/* <div className="col-md-6 mb-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Người Dùng Trực Tuyến</h5>
                    <ul className="list-group list-group-flush">
                      {onlineUsers.map(user => (
                        <li className="list-group-item" key={user.id}>
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
