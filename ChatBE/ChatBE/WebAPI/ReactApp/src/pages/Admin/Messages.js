// src/pages/admin/Messages.js
import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Table } from "reactstrap";
import { Message, dbMessage } from "../../variables/general";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(dbMessage);

  // Hàm xử lý tìm kiếm theo từ khóa
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMessages(term, selectedDate);
  };

  // Hàm xử lý lọc theo ngày
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    filterMessages(searchTerm, date);
  };

  /// Hàm lọc tin nhắn theo từ khóa và ngày
const filterMessages = (term, date) => {
  const filtered = dbMessage.filter((message) => {
    const matchesTerm = message.data.some((field) =>
      field.toString().toLowerCase().includes(term)
    );

    const messageDate = new Date(message.date);
    const isValidDate = !isNaN(messageDate); // Kiểm tra tính hợp lệ của ngày
    const matchesDate = date && isValidDate
      ? messageDate.toISOString().slice(0, 10) === date
      : true;

    return matchesTerm && matchesDate;
  });

  setFilteredMessages(filtered);
};


  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9" style={{ marginLeft: '250px', width: '81%' }}>
          <Header title="Quản lý Message" />

          <div className="container-fluid">
            <h4 style={{ margin: '10px' }}>Message Table</h4>

            {/* Input tìm kiếm */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm tin nhắn..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Input lọc theo ngày */}
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            {/* Bảng tin nhắn */}
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  {Message.map((prop, key) => (
                    <th className="text-center" key={key}>{prop}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message, key) => (
                  <tr key={key}>
                    {message.data.map((field, key) => (
                      <td key={key} className="text-center">{field}</td>
                    ))}
                    <td className="text-center">{message.date}</td>
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

export default Messages;
