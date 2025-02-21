// components/VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import { mockMovies } from '../mockData';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const { id } = useParams();
  const movie = mockMovies.find(m => m.id === parseInt(id));

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (movie?.videoURL) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(movie.videoURL);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = movie.videoURL;
      }
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [movie]);

  return (
    <div className="player-container">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="video-player"
      />
    </div>
  );
};

export default VideoPlayer;