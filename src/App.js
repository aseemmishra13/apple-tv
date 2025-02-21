import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VideoPlayer from './components/VideoPlayer';
import MovieDetail from './components/Home/MovieDetail';
import PrivateRoute from './components/PrivateRoute';
import './App.css'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/player/:id" element={
            <PrivateRoute>
              <VideoPlayer />
            </PrivateRoute>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;