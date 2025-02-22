const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');

exports.streamVideo = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);
    const videoPath = path.join(__dirname, '..', content.videoURL);
    
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end-start+1,
        'Content-Type': 'video/mp4'
      });

      fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(404).json({ error: 'Video not found' });
  }
};