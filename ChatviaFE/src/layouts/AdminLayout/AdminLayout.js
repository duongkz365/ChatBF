import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => <div className="p-3"><h4>Dashboard Content</h4></div>;
const UserGroup = () => <div className="p-3"><h4>User Group Content</h4></div>;
const Messages = () => <div className="p-3"><h4>Messages Content</h4></div>;

const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="col-md-9" style={{ marginLeft: '250px', width:'81.5%'}}>
          <Header />
          <div className="container-fluid">
            {/* Nội dung */}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
