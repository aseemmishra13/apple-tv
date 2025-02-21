import React from 'react';
import MovieCard from './MovieCard';

const Row = ({ title, items }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Row;