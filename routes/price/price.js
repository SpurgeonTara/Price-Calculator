import express from 'express';

import {
  createPrice,
  getAllPrices,
  getPrice,
  deletePrice,
  calculatePrice,
} from '../../controllers/price.js';

import {
  createPriceValidator,
  validateCalculatePrice,
} from '../../middlewares/validators/price.js';

const priceRouter = express.Router();

priceRouter.post('/', createPriceValidator, createPrice);
priceRouter.get('/', getAllPrices);

priceRouter.post('/calculate', validateCalculatePrice, calculatePrice);

priceRouter.get('/:id', getPrice);
priceRouter.delete('/:id', deletePrice);

export default priceRouter;
