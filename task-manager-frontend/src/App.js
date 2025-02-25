// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTask from './pages/CreateTask';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Task Management</h1>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;