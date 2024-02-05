import multer from 'multer';
import path from 'path';
const productImageUpload = () => {
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
export { productImageUpload };
