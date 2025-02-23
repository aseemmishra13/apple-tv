// components/VideoPlayer.js
import React, { useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Hls from 'hls.js';

const VideoPlayer = () => {
   
    const { id } = useParams();
   
    const { items, status, error } = useSelector((state) => state.content);
    console.log(items,status,error)
    const movie = items.find(m => m.id === (id));

  const videoRef = useRef(null);


  useEffect(() => {
     
    const video = videoRef.current;
    let hls;

    if (movie?.videoURL) {
      if (Hls.isSupported({
        autoStartLoad: true,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false; // Disable CORS for local files
        }
      })) {
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