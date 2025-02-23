import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hls from 'hls.js';

const VideoPlayer = () => {
  const { id } = useParams();
  const { items, status, error } = useSelector((state) => state.content);
  console.log(status,error)
  const movie = items.find(m => m.id === id);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (movie?.videoURL) {
      // Determine file extension
      const extension = movie.videoURL.split('.').pop().toLowerCase();

      if (extension === 'm3u8') {
        // Use HLS.js for HLS streams
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(movie.videoURL);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = movie.videoURL;
        }
      } else if (extension === 'mp4' || extension === 'webm' || extension === 'ogg') {
        // For formats natively supported by HTML5
        video.src = movie.videoURL;
      } else if (extension === 'avi') {
        console.error(
          'AVI format is not supported natively by HTML5. Please convert your AVI file to MP4 or another supported format.'
        );
        // Optionally, you can display an error message to the user
      } else {
        console.error('Unsupported video format.');
      }
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [movie]);

  return (
    <div className="player-container">
      <video ref={videoRef} controls autoPlay className="video-player" />
    </div>
  );
};

export default VideoPlayer;
