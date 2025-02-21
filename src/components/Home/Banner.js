// components/Home/Banner.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="banner"
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${movie.posterURL})`
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie.title}</h1>
        <p className="banner-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default Banner;