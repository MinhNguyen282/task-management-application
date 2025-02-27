// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTask from './pages/CreateTask';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/register" element={isAuthenticated() ? <Navigate to="/tasks" /> : <Register />} />
          <Route path="/tasks" element={isAuthenticated() ? <TaskListPage /> : <Navigate to="/login" />} />
          <Route path="/create" element={isAuthenticated() ? <CreateTask /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;