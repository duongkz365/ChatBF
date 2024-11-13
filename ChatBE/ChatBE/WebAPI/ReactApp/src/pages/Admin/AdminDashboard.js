// src/pages/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0); // Số lượng người dùng
  const [groupCount, setGroupCount] = useState(0); // Số lượng nhóm chat
  const [messageCount, setMessageCount] = useState(0); // Số lượng tin nhắn
  const [recentMessages, setRecentMessages] = useState([]); // Tin nhắn gần đây
  const [onlineUsers, setOnlineUsers] = useState([]); // Người dùng trực tuyến

  // useEffect giả lập lấy dữ liệu từ API
  useEffect(() => {
    // Giả lập dữ liệu từ API
    setUserCount(120);
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

            {/* Danh Sách Tin Nhắn Gần Đây */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Tin Nhắn Gần Đây</h5>
                    <ul className="list-group list-group-flush">
                      {recentMessages.map(message => (
                        <li className="list-group-item" key={message.id}>
                          <strong>{message.sender}</strong>: {message.content} <span className="text-muted">({message.time})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Danh Sách Người Dùng Trực Tuyến */}
              <div className="col-md-6 mb-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
