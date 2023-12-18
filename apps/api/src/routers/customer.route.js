import { Router } from 'express';
import {
  createCustomer,
  getCustomer,
  loginCustomer,
} from '../controllers/customer.controller';
import jwt from 'jsonwebtoken';
import Customer from '../models/customer.model';
import { verifyToken } from '../middleware/customer.auth.middleware';

const customerRouter = Router();

customerRouter.get('/', async (req, res) => {
  const result = await getCustomer();
  res.send(result);
});

customerRouter.get('/login', async (req, res) => {
  const result = await loginCustomer(req?.query, res);
  res.send(result);
});

customerRouter.get('/verify/:token', async (req, res) => {
  const token = req?.params?.token;
  try {
    const decoded = jwt.verify(token, process.env.KEY_CUSTOMER_JWT);
    const customerId = decoded?.id;
    await Customer.update({ isVerified: true }, { where: { id: customerId } });
    res.send('Verification successful. Your account is now verified.');
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid or expired token. Please try again.');
  }
});

customerRouter.post('/register-customer', async (req, res) => {
  const result = await createCustomer(req?.body, res);
  res.status(result?.statusCode);
});

export { customerRouter };
