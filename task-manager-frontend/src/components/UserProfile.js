// client/src/components/UserProfile/UserProfile.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    settings: {
      emailNotifications: true,
      darkMode: false,
      taskReminders: true
    }
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/users/profile');
      setUser(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        settings: response.data.settings || {
          emailNotifications: true,
          darkMode: false,
          taskReminders: true
        }
      });
    } catch (error) {
      setError('Error fetching profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (setting) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/users/profile', formData);
      setUser(response.data);
      setEditMode(false);
      // Update theme if darkMode changed
      if (response.data.settings.darkMode !== user.settings.darkMode) {
        document.body.classList.toggle('dark-mode');
      }
    } catch (error) {
      setError('Error updating profile');
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <button 
          onClick={() => setEditMode(!editMode)}
          className="edit-button"
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="settings-section">
            <h3>Settings</h3>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={formData.settings.emailNotifications}
                  onChange={() => handleSettingChange('emailNotifications')}
                />
                Email Notifications
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={formData.settings.darkMode}
                  onChange={() => handleSettingChange('darkMode')}
                />
                Dark Mode
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={formData.settings.taskReminders}
                  onChange={() => handleSettingChange('taskReminders')}
                />
                Task Reminders
              </label>
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-item">
            <strong>Username:</strong> {user.username}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="info-item">
            <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </div>
          
          <div className="settings-display">
            <h3>Settings</h3>
            <div className="setting-item">
              <span>Email Notifications:</span>
              <span className={user.settings.emailNotifications ? 'enabled' : 'disabled'}>
                {user.settings.emailNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="setting-item">
              <span>Dark Mode:</span>
              <span className={user.settings.darkMode ? 'enabled' : 'disabled'}>
                {user.settings.darkMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="setting-item">
              <span>Task Reminders:</span>
              <span className={user.settings.taskReminders ? 'enabled' : 'disabled'}>
                {user.settings.taskReminders ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;