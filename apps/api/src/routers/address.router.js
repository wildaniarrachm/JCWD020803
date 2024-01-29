import { Router } from 'express';
import {
  deleteAddress,
  deletePermanentAddress,
  editAddress,
  getAddressById,
  getAllAddress,
  getAllCity,
  getAllProvince,
  getCityAndProvinceById,
  getCityByProvince,
  getCustomerAddress,
  newAddress,
  recoverAddress,
  switchDeliveriedAddress,
  switchPrimaryAddress,
} from '../controllers/address.controller';
import { verifyToken } from '../middleware/customer.auth.middleware';

const addressRouter = Router();

addressRouter.get('/', getAllAddress);
addressRouter.get('/city', getAllCity);
addressRouter.get('/province', getAllProvince);
addressRouter.get('/city-province', getCityByProvince);
addressRouter.get('/city-province-id', getCityAndProvinceById);
addressRouter.patch('/delete-address/:id', deleteAddress);
addressRouter.delete('/delete-permanent/:id', deletePermanentAddress);
addressRouter.patch('/recover-address/:id', recoverAddress);
addressRouter.patch('/switch-primary', verifyToken, switchPrimaryAddress);
addressRouter.patch('/switch-deliveried', verifyToken, switchDeliveriedAddress);
addressRouter.post('/', verifyToken, newAddress);
addressRouter.get('/customer', verifyToken, getCustomerAddress);
addressRouter.patch('/edit-address', verifyToken, editAddress);
addressRouter.get('/:id', getAddressById);

export { addressRouter };
