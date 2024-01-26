import { Router } from 'express';
import {
  addCities,
  getAllCity,
  getCityById,
} from '../controllers/city.controller';


const cityRouter = Router();

cityRouter.get('/', getAllCity);
cityRouter.post('/', addCities);
cityRouter.get('/:id', getCityById);


export { cityRouter };
