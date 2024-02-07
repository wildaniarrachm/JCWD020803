import { Router } from 'express';
import { getShippingCost } from '../controllers/shipping.controller';

const shippingRouter = Router();

shippingRouter.post('/', getShippingCost);

export { shippingRouter };
