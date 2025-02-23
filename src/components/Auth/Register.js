import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const Register = () => {
  const [userData, setUserData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
        const response = await axios.post(
          `https://6sg271zd-8000.use.devtunnels.ms/api/auth/register`,
          userData
        );
    console.log(response.data)
        // const { token } = response.data;
        // localStorage.setItem('token', token);
        
        // // Dispatch register action with user data
        // dispatch(register({
          
        //   email: email,
        //   username: username,
        //   password: password
        // }));
    
        navigate('/login');
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