import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Table } from "reactstrap";
import { thead, tbody, dbGroup, Group } from "../../variables/general";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(dbGroup);

  // Hàm xử lý tìm kiếm từ khóa
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterGroups(term, filterDate);
  };

  // Hàm xử lý lọc theo ngày
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    filterGroups(searchTerm, selectedDate);
  };

  // Hàm kết hợp để lọc nhóm theo từ khóa và ngày
  const filterGroups = (term, date) => {
    const filtered = dbGroup.filter((group) => {
      const matchTerm = group.data.some((field) =>
        typeof field === 'string' && field.toLowerCase().includes(term)
      );
      const matchDate = !date || (new Date(group.date).toISOString().slice(0, 10) === date);
      return matchTerm && matchDate;
    });
    setFilteredGroups(filtered);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>

        <div className="col-md-9" style={{ marginLeft: '250px', width: '81%' }}>
          <Header title="Quản lý Group" />
          <div className="container-fluid">
            <h4 style={{ margin: '10px' }}>Groups Table</h4>

            {/* Tìm kiếm nhóm */}
            <input
              type="text"
              placeholder="Tìm kiếm nhóm"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />

            {/* Lọc theo ngày */}
            <input
              type="date"
              value={filterDate}
              onChange={handleDateChange}
              className="form-control mb-3"
            />

            {/* Bảng nhóm đã lọc */}
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  {Group.map((prop, key) => (
                    <th key={key} className="text-center">{prop}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group, key) => (
                  <tr key={key}>
                    {group.data.map((field, key) => (
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

export default Groups;
