import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { email });
            setMessage('Password reset instructions sent to your email');
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Password Reset</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Send Reset Instructions'}
                    </button>
                </form>
            </div>
        </div>
    );
};