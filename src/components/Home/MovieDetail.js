// components/Home/MovieDetail.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../../store/slices/contentSlice';
const MovieDetail = () => {
    const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.content);
  console.log(items,status, error)
  const movie = items.find(m => m.id === (id));

    useEffect(() => {
      dispatch(fetchContent());
    }, [dispatch]);

  return (
    <div 
      className="movie-detail-container"
      style={{ 
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5)), url(${movie.backdropURL})`
      }}
    >
      {/* Navbar with title */}
      <div className="movie-navbar">
        <h1 className="movie-title">{movie.title}</h1>
      </div>

      <div className="movie-bottom-content">
        {/* Left Side - Play Button & Summary */}
        
          <button 
            className="play-button"
            onClick={() => navigate(`/player/${id}`)}
          >
            ▶ Play
          </button>
          <div className="movie-summary">
            <h3>Summary</h3>
            <p>{movie.description}</p>
          </div>
     

        {/* Right Side - Cast & Crew */}
        <div className="cast-director-info">
          <div className="director-section">
            <h4>Director</h4>
            <p>{movie.director}</p>
          </div>
          <div className="cast-section">
            <h4>Starring</h4>
            {movie.cast.map((member, index) => (
              <p key={index}>{member}</p>
            ))}
              
          </div>
          </div>
        </div>
    </div>
  );
};

export default MovieDetail;