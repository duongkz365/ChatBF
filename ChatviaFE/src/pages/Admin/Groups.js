import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'reactstrap';
import { dbGroup, Group } from "../../variables/general";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState(dbGroup);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  // Fetch groups when component mounts or when filtering criteria changes
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://localhost:7098/api/Group', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        if (response.ok) {
          setGroups(data);
          setFilteredGroups(data);
        } else {
          console.error('Error fetching groups:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGroups();
  }, []);
  
  // Handle search term change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterGroups(term, filterDate);
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    filterGroups(searchTerm, selectedDate);
  };

  // Filter groups based on search term and date
  const filterGroups = (term, date) => {
    const filtered = groups.filter((group) => {
      const matchTerm = group.name.toLowerCase().includes(term);  // Assuming 'name' is the group name field
      const matchDate = !date || (new Date(group.createdAt).toISOString().slice(0, 10) === date);
      return matchTerm && matchDate;
    });
    setFilteredGroups(filtered);
  };

  // Open modal to delete group
  const openDeleteModal = (group) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  // Handle group deletion
  const deleteGroupHandler = async () => {
    try {
      const response = await fetch(`https://localhost:7098/api/Group/delete-group`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId: selectedGroup.groupId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setGroups(groups.filter(group => group.groupId !== selectedGroup.groupId));
        setModalOpen(false);
      } else {
        console.error('Error deleting group:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>

        <div className="col-md-9" style={{ marginLeft: '250px', width: '81%' }}>
          <Header title="Group Management" />
          <div className="container-fluid">
            <h4 style={{ margin: '10px' }}>Groups Table</h4>

            {/* Search input field */}
            <input
              type="text"
              placeholder="Search Groups"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />

            {/* Date filter */}
            <input
              type="date"
              value={filterDate}
              onChange={handleDateChange}
              className="form-control mb-3"
            />

            {/* Groups Table */}
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
                    <td className="text-center">
                      <button
                        className="ri ri-delete-bin-5-line"
                        style={{ color: 'red' }}
                        onClick={() => openDeleteModal(group)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Delete Group Modal */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Delete Group</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the group: <strong>{selectedGroup ? selectedGroup.name : ''}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteGroupHandler}>Delete</Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Groups;
