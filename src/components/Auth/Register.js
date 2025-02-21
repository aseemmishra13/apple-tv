import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/userSlice';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', userData);
      dispatch(register(response.data.user));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserData({...userData, username: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserData({...userData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUserData({...userData, password: e.target.value})}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;