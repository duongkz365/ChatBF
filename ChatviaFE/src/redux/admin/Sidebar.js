import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
const Sidebar = () => {
  const location = useLocation();
// Side bar //
  return (
    <div className="bg-light p-3" style={{ minHeight: '100vh', width: '250px', position: 'fixed' }}>
      {/* Chat App heading */}
      
              
                <div className="navbar-brand-box" style={{alignItems:'center', marginTop:'20px'}} >
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm" style={{display:'flex'}}> 
                            <img style={{marginLeft:"20px"}} src={logo} alt="logo" height="30" /> <h4 style={{marginLeft:"5px"}}>ChatApp</h4>
                        </span>
                    </Link>

                    
                </div>
      
      {/* Sidebar links */}
      <ul className="list-unstyled" style={{marginTop:'20px'}}>
        <li>
          <Link 
            to="/admin" 
            className={`sidebar-link p-2 text-dark ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <i className="ri-home-4-line mr-2"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/users" 
            className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/users' ? 'active' : ''}`}
          >
            <i className="ri-user-3-line mr-2"></i> User
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/groups" 
            className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/groups' ? 'active' : ''}`}
          >
            <i className="ri-group-line mr-2"></i> Group
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/messages" 
            className={`sidebar-link p-2 text-dark ${location.pathname === '/admin/messages' ? 'active' : ''}`}
          >
            <i className="ri-message-3-line mr-2"></i> Message
          </Link>
        </li>
      </ul>
      
      {/* Move Logout to the bottom */}
      <ul className="list-unstyled" style={{ marginTop: 'auto' }}>
        <li>
          <Link to="/logout" className="sidebar-link p-2 text-dark">
            <i className="ri-logout-box-line mr-2"></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
