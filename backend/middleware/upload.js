const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// middleware/upload.js
const allowedExtensions = [
    '.mp4',
    '.mov',
    '.avi',
    '.mkv',
    '.webm'
  ];
  
  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    console.log('MIME Type:', file.mimetype);
    console.log('File Extension:', ext);
  
    // Allow if either condition is true
    if (file.mimetype.startsWith('video/') || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype} (${ext})`), false);
    }
  };

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 500 } // 500MB limit
});

module.exports = upload;