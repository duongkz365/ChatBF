import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-light p-3" style={{ minHeight: '100vh', width: '250px', position: 'fixed' }}>
      {/* Make the Chat App heading a clickable link */}
      <h4 className="p-3">
        <Link to="/dashboard" className="text-dark">Chat App</Link>
      </h4>
      <ul className="list-unstyled">
        <li>
          <Link to="/admin" className={`sidebar-link p-2 text-dark ${location.pathname === '/admin' ? 'active' : ''}`}>Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users" className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/users' ? 'active' : ''}`}>User</Link>
        </li>
        <li>
          <Link to="/admin/groups" className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/groups' ? 'active' : ''}`}>Group</Link>
        </li>
        <li>
          <Link to="/admin/messages" className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/messages' ? 'active' : ''}`}>Message</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
