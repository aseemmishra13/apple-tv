import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img src={movie.posterURL} alt={movie.title} />
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{movie.genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;