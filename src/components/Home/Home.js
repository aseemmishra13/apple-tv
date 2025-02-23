import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../../store/slices/contentSlice';
import Banner from './Banner';
import Row from './Row';
// import LoadingSpinner from '../Common/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.content);
  console.log(items,status, error)
  const movie = items.find(item => item.isFeatured);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

//   if (status === 'loading') return <LoadingSpinner />;
//   if (error) return <div className="error">Error loading content: {error}</div>;

  return (
    <div className="home">
      {movie && <Banner movie={movie} />}
      
      <Row 
        title="Trending Now" 
        items={items.filter(item => item.isTrending)} 
      />
      <Row
        title="New Releases"
        items={items.filter(item => 
          new Date(item.releaseDate) > Date.now() - 60 * 86400000 // Last 60 days
        )}
      />
      <Row
        title="Apple Originals"
        items={items.filter(item => item.isOriginal)}
      />
    </div>
  );
};

export default Home;