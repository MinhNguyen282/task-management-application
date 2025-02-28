// client/src/components/Navigation/Navigation.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          Task Manager
        </Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <Link to="/create" className="nav-link">
              Create Task
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;