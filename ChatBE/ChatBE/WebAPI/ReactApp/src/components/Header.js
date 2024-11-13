import React from 'react';

const Header = (props) => {
  return (
    <header className="bg-primary text-white p-3">
      <div className=" d-flex justify-content-between align-items-center">
        <h3>{props.title}</h3>
        <div className="d-flex">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
};

export default Header;
