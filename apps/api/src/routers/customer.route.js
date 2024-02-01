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
  socialRegister,
  changeEmail,
  verifyNewEmail,
  changePasswordCustomer,
  sendReverification,
} from '../controllers/customer.controller';
import { verifyToken } from '../middleware/customer.auth.middleware';
import { customerProfileUpload } from '../middleware/multer.middleware';

const customerRouter = Router();

customerRouter.get('/get-referral', getReferral);
customerRouter.post('/register-customer', createCustomer);
customerRouter.post('/reverification', sendReverification);
customerRouter.post('/login', loginCustomer);
customerRouter.post('/social-register', socialRegister);
customerRouter.post('/reset-password', forgotPassword);
customerRouter.get('/verify/:token', verifyAccount);
customerRouter.get('/request-verify', verifyToken, verifyNewEmail);
customerRouter.patch(
  '/upload-image',
  verifyToken,
  customerProfileUpload().single('file'),
  uploadImageCustomer,
);
customerRouter.post('/change-password', verifyToken, changePasswordCustomer);
customerRouter.patch('/added-phone-number', verifyToken, addedPhoneCustomer);
customerRouter.patch('/verify-phone-number', verifyToken, verifiedPhoneNumber);
customerRouter.get('/keep-login', verifyToken, keepLogin);
customerRouter.post('/create-password', verifyToken, createPasswordCustomer);
customerRouter.post('/change-email', verifyToken, changeEmail);
customerRouter.patch('/new-password', verifyToken, newPassword);
customerRouter.get('/create-password/:token', getCustomerByToken);
customerRouter.get('/get-customer-by-id/:id', getById);
export { customerRouter };
