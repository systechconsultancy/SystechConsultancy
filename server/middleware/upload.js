import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return cb(new Error('Only JPG, JPEG, and PNG are allowed'));
  }
  cb(null, true);
};

export default multer({ storage, fileFilter, limits: { fileSize: 750 * 1024 } });
