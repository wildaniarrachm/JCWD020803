import multer from 'multer';
import path from 'path';
const customerProfileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        'PROFILE' +
          '_' +
          Date.now() +
          Math.round(Math.random() * 1000) +
          '.' +
          file.mimetype.split('/')[1],
      );
    },
  });
  const fileFilter = (req, file, cb) => {
    const exFilter = ['jpg', 'jpeg', 'png'];
    const checkExt = exFilter.includes(
      file.mimetype.split('/')[1].toLowerCase(),
    );
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new error('File format not supported'));
    }
  };
  return multer({ storage, fileFilter });
};
export { customerProfileUpload };
export const adminProfileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        'ADMINPICT' +
          '_' +
          Date.now() +
          Math.round(Math.random() * 1000) +
          file.mimetype.split('/')[1],
      );
    },
    limits: {
      fileSize: 1024 * 1024,
    },
  });
  const fileFilter = (req, file, cb) => {
    const exFilter = ['jpg', 'png', 'jpeg', 'gif'];
    const checkExt = exFilter.includes(
      file.mimetype.split('/')[1].toLowerCase(),
    );
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new error('Format file is not supported'));
    }
  };
  return multer({ storage, fileFilter})
};

export const productImage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        'PRODUCT' +
          '_' +
          Date.now() +
          Math.round(Math.random() * 1000) +
          file.mimetype.split('/')[1],
      );
    },
    limits: {
      fileSize: 1024 * 1024,
    },
  });
  const fileFilter = (req, file, cb) => {
    const exFilter = ['jpg', 'png', 'jpeg', 'gif'];
    const checkExt = exFilter.includes(
      file.mimetype.split('/')[1].toLowerCase(),
    );
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new error('Format file is not supported'));
    }
  };
  return multer({ storage, fileFilter})
};

