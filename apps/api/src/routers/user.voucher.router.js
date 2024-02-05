import { Router } from 'express';
import {
  getAllUserVouchers,
  getUserVoucherById,
} from '../controllers/user.voucher.controller';

const userVouchersRouter = Router();

userVouchersRouter.get('/', getAllUserVouchers);
userVouchersRouter.get('/search', getUserVoucherById);

export { userVouchersRouter };
