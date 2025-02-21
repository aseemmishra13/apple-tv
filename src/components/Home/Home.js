import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/slices/contentSlice';
import Banner from './Banner';
import Row from './Row';
import { bannerMovie } from '../../mockData';

const Home = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="home">
     
      <Banner movie={bannerMovie} />
      <Row title="Trending Now" items={movies} />
      <Row title="New Releases" items={movies} />
    </div>
  );
};

export default Home;