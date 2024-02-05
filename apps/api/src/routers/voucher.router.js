import { Router } from 'express';
import { getVoucherByCode } from '../controllers/voucher.controller';

const voucherRouter = Router();

voucherRouter.get('/:code', getVoucherByCode);

export { voucherRouter };
