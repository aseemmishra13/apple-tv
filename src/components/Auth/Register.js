import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/userSlice';
import axios from 'axios';


const Register = () => {
  const [userData, setUserData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
        const response = await axios.post(
          `https://6sg271zd-8000.use.devtunnels.ms/auth/register`,
          userData
        );
    
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        
        // Dispatch register action with user data
        dispatch(register({
          id: user._id,
          email: user.email,
          username: user.username,
          password: user.password
        }));
    
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.error || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({...userData, username: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Register;