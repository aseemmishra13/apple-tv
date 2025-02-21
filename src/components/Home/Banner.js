import React from 'react';
import { bannerMovie } from '../../mockData';

const Banner = () => {
    return (
        <div 
        className="banner"
        style={{
          backgroundImage: `url(${bannerMovie.posterURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">Welcome to Apple TV+ Clone</h1>
          <p className="banner-description">Watch exclusive Apple Originals here.</p>
        </div>
      </div>
    );
  };

export default Banner;