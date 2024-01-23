import { Router } from 'express';
import { addCities, getAllCity } from '../controllers/city.controller';

const cityRouter = Router();

cityRouter.get('/', getAllCity);
cityRouter.post('/', addCities);

export { cityRouter };
