import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Table } from "reactstrap";
import { thead, tbody, blockUser, dbBlockUser } from "../../variables/general";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(tbody);

  // Hàm để lọc tin nhắn dựa trên từ khóa và ngày
  const filterMessages = (term, date) => {
    const filtered = tbody.filter((message) => {
      const messageDate = new Date(message.date);
      const messageText = message.data.join(' ').toLowerCase();
      return (
        (!date || (!isNaN(messageDate) && messageDate.toISOString().slice(0, 10) === date)) &&
        messageText.includes(term)
      );
    });
    setFilteredMessages(filtered);
  };

  // Hàm xử lý tìm kiếm theo từ khóa
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMessages(term, filterDate);
  };

  // Hàm lọc tin nhắn theo ngày
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    filterMessages(searchTerm, selectedDate);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9" style={{ marginLeft: '250px', width: '81.5%' }}>
          <Header title="Quản lý User" />
          <div className="container-fluid">
            <h4 style={{ margin: '10px' }}>Users Table</h4>

            {/* Trường nhập liệu tìm kiếm từ khóa */}
            <input
              type="text"
              placeholder="Tìm kiếm tin nhắn"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />

            {/* Bộ lọc theo ngày */}
            <input
              type="date"
              value={filterDate}
              onChange={handleDateChange}
              className="form-control mb-3"
            />

            {/* Bảng tin nhắn đã lọc */}
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  {thead.map((prop, key) => (
                    <th key={key} className="text-center">{prop}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message, key) => (
                  <tr key={key}>
                    {message.data.map((field, key) => (
                      <td key={key} className="text-center">{field}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Bảng Blocked Users */}
            <h4 style={{ margin: '10px' }}>Blocked Users Table</h4>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  {blockUser.map((prop, key) => (
                    <th key={key} className="text-center">{prop}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dbBlockUser.map((blockedUser, key) => (
                  <tr key={key}>
                    {blockedUser.data.map((field, key) => (
                      <td key={key} className="text-center">{field}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
