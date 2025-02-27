// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTask from './pages/CreateTask';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskListPage/>
              </PrivateRoute>
            }
          />
          <Route path="/create" element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to ="/tasks" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;