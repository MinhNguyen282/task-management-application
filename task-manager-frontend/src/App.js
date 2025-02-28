// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTask from './pages/CreateTask';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation/Navigation';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenChecked, setIsAuthenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authStatus = token && !isTokenExpired(token);
    setIsAuthenticated(authStatus);
    setIsAuthenChecked(true);
  }, []);

  if (!isAuthenChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />} />
            <Route path="/tasks" element={isAuthenticated ? <TaskListPage /> : <Navigate to="/login" />} />
            <Route path="/create" element={isAuthenticated ? <CreateTask /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login"/>} />
            <Route path="/reset-password" element={<PasswordReset />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;