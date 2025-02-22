const Content = require('../models/Content');
const upload = require('../middleware/upload');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');


// Get all content
exports.getContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new content
// exports.createContent = [
//     upload.single('video'),
//     async (req, res) => {
//       try {
//         // Process video with FFmpeg
//         const outputPath = path.join('videos', `${req.file.filename}.m3u8`);
        
//         await new Promise((resolve, reject) => {
//           ffmpeg(req.file.path)
//             .outputOptions([
//               '-profile:v baseline',
//               '-level 3.0',
//               '-start_number 0',
//               '-hls_time 10',
//               '-hls_list_size 0',
//               '-f hls'
//             ])
//             .save(outputPath)
//             .on('end', resolve)
//             .on('error', reject);
//         });
  
//         const newContent = await Content.create({
//           ...req.body,
//           videoURL: `/videos/${req.file.filename}.m3u8`
//         });
  
//         res.status(201).json(newContent);
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }
//     }
//   ];

exports.createContent = async (req, res) => {
    try {
      const newContent = await Content.create(req.body);
      res.status(201).json(newContent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };