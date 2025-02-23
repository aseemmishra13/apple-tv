import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Send login request to backend
      const response = await axios.post(
        `https://6sg271zd-8000.use.devtunnels.ms/api/auth/login`,
        credentials
      );

      // 2. Extract token from response
      const { token } = response.data;

      // 3. Store token in localStorage
      localStorage.setItem('token', token);

      // 4. Decode token to get user data
      const decodedUser = jwtDecode(token);

      // 5. Dispatch user data to Redux store
      dispatch(login({
        id: decodedUser.id,
        email: decodedUser.email,
        username: decodedUser.username
      }));

      // 6. Redirect to homepage
      navigate('/');

    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

      </form>
   


<div className="auth-switch">
  Don't have an account? <Link to="/register">Sign Up</Link>
</div>
    </div>
  );
};

export default Login;