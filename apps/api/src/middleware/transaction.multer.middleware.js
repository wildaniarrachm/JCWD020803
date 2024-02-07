import multer from 'multer';
import path from 'path';

const transactionUploadPayment = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        'UPLOAD_PAYMENT' +
          '-' +
          Date.now() +
          '-' +
          Math.round(Math.random() * 1000) +
          '.' +
          file.mimetype.split('/')[1],
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const exFilter = ['jpg', 'jpeg', 'png', 'webp'];
    const checkExt = exFilter.includes(
      file.mimetype.split('/')[1].toLowerCase(),
    );
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new Error('File format not supported'));
    }
  };

  const limits = {
    fileSize: 1024 * 1024,
  };

  return multer({ storage, fileFilter, limits });
};

export { transactionUploadPayment };
