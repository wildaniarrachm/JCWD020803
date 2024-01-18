import { Router } from 'express';
import {
  createCustomer,
  createPasswordCustomer,
  getCustomerByToken,
  getReferral,
  keepLogin,
  loginCustomer,
  addedPhoneCustomer,
  uploadImageCustomer,
  verifyAccount,
  sendVerificationCode,
  verifyCodePhone,
  forgotPassword,
  newPassword,
  verifiedPhoneNumber,
  getById,
} from '../controllers/customer.controller';
import { verifyToken } from '../middleware/customer.auth.middleware';
import { customerProfileUpload } from '../middleware/multer.middleware';

const customerRouter = Router();

customerRouter.get('/get-referral', getReferral);
customerRouter.post('/register-customer', createCustomer);
customerRouter.post('/login', loginCustomer);
// customerRouter.post('/send-code', sendVerificationCode);
// customerRouter.post('/verify-code', verifyCodePhone);
customerRouter.post('/reset-password', forgotPassword);
customerRouter.patch(
  '/upload-image',
  customerProfileUpload().single('file'),
  uploadImageCustomer,
);
customerRouter.patch('/added-phone-number', verifyToken, addedPhoneCustomer);
customerRouter.patch('/verify-phone-number', verifyToken, verifiedPhoneNumber);
customerRouter.get('/keep-login', verifyToken, keepLogin);
customerRouter.post('/create-password', verifyToken, createPasswordCustomer);
customerRouter.get('/verify/:token', verifyAccount);
customerRouter.patch('/new-password', verifyToken, newPassword);
customerRouter.get('/create-password/:token', getCustomerByToken);
customerRouter.get('/get-customer-by-id/:id', getById);
export { customerRouter };
