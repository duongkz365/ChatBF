import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'reactstrap';
import { thead, blockUser, dbBlockUser } from "../../variables/general";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState({ start: '', end: '' });
  const [updatedData, setUpdatedData] = useState({ fullName: '', email: '', role: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  // Fetch user data when the component loads or when showBlocked changes
  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = showBlocked ? 'blocked' : 'unblocked';
      try {
        const response = await fetch(`https://localhost:7098/api/Admin/${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        if (response.ok) {
          showBlocked ? setBlockedUsers(data) : setUsers(data);
        } else {
          console.error('Error fetching users:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, [showBlocked]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter users based on search term and date filter
  const filteredUsers = (showBlocked ? blockedUsers : users).filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm);
    const matchesDate =
      (filterDate.start && new Date(user.createdAt) >= new Date(filterDate.start)) &&
      (filterDate.end && new Date(user.createdAt) <= new Date(filterDate.end));
    return matchesSearch && (matchesDate || !filterDate.start || !filterDate.end);
  });

  // Open modal to update user data
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdatedData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
    setModalOpen(true);
  };

  // Handle input changes for the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prev => ({ ...prev, [name]: value }));
  };

  // Update user details
  const updateUserHandler = async () => {
    try {
      const response = await fetch(`https://localhost:7098/api/Admin/update/${selectedUser.userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        const updatedList = showBlocked ? blockedUsers : users;
        const updatedUsers = updatedList.map(user =>
          user.userId === selectedUser.userId ? { ...user, ...updatedData } : user
        );
        showBlocked ? setBlockedUsers(updatedUsers) : setUsers(updatedUsers);
        setModalOpen(false);
      } else {
        console.error('Error updating user:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Block a user
  const blockUserHandler = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7098/api/Admin/block/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUsers(users.filter(user => user.userId !== userId));
        setBlockedUsers([...blockedUsers, users.find(user => user.userId === userId)]);
      } else {
        console.error('Error blocking user:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Unblock a user
  const unblockUserHandler = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7098/api/Admin/unblock/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setBlockedUsers(blockedUsers.filter(user => user.userId !== userId));
        setUsers([...users, blockedUsers.find(user => user.userId === userId)]);
      } else {
        console.error('Error unblocking user:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete a user
  const deleteUserHandler = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7098/api/Admin/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUsers(users.filter(user => user.userId !== userId));
        setBlockedUsers(blockedUsers.filter(user => user.userId !== userId));
      } else {
        console.error('Error deleting user:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Toggle between showing blocked and unblocked users
  const toggleShowBlocked = () => {
    setShowBlocked(prev => !prev);
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilterDate(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9" style={{ marginLeft: '250px', width: '81.5%' }}>
          <Header title="User Management" />
          <div className="container-fluid">
            <h4 style={{ margin: '10px' }}>Users Table</h4>

            {/* Search input field */}
            <input
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mb-3"
            />

            {/* Date filter */}
            <div className="d-flex mb-3">
              <input
                type="date"
                name="start"
                value={filterDate.start}
                onChange={handleDateChange}
                className="form-control mr-2"
              />
              <span className="mx-2">to</span>
              <input
                type="date"
                name="end"
                value={filterDate.end}
                onChange={handleDateChange}
                className="form-control ml-2"
              />
            </div>

            {/* Toggle between blocked and unblocked users */}
            <button className="btn btn-info mb-3" onClick={toggleShowBlocked}>
              {showBlocked ? 'Show Unblocked' : 'Show Blocked'}
            </button>

            {/* Users Table */}
<Table responsive className="table-striped">
  <thead className="text-primary">
    <tr>
      <th className="text-center">#</th>
      <th className="text-center">User ID</th>
      <th className="text-center">Full Name</th>
      {!showBlocked && <th className="text-center">Status</th>}
      <th className="text-center">Created At</th>
      <th className="text-center">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user, key) => (
      <tr key={key}>
        <td className="text-center">{key + 1}</td>
        <td className="text-center">{user.userId}</td>
        <td className="text-center">{user.fullName}</td>
        {!showBlocked && (
          <td className="text-center">
            {user.isActive ? <span className="Status_Online">Online</span> : <span className="Status_Offline">Offline</span>}
          </td>
        )}
        <td className="text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
        <td className="text-center">
          {/* {!showBlocked && (
            <button className="ri ri-edit-2-line" style={{ color: 'black' }} onClick={() => openUpdateModal(user)} />
          )} */}
          <button
            className="ri ri-delete-bin-5-line"
            style={{ color: 'red', marginLeft: '10px' }}
            onClick={() => deleteUserHandler(user.userId)}
          />
          {showBlocked ? (
            <button
              className="ri ri-arrow-right-s-line"
              style={{ marginLeft: '10px', color: 'green' }}
              onClick={() => unblockUserHandler(user.userId)}
            />
          ) : (
            <button
              className="ri ri-lock-line"
              style={{ marginLeft: '10px', color: 'gray' }}
              onClick={() => blockUserHandler(user.userId)}
            />
          )}
        </td>
      </tr>
    ))}
  </tbody>
</Table>


            {/* Update User Modal */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
              <ModalHeader toggle={() => setModalOpen(false)}>Update User</ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label>Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={updatedData.fullName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <Input
                    type="text"
                    name="role"
                    value={updatedData.role}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={updateUserHandler}>Update</Button>
                <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
