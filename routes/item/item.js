import express from 'express';

import createItemvalidator from '../../middlewares/validators/item.js';
import {
  createItem,
  getAllItems,
  getItem,
  deleteItem,
} from '../../controllers/item.js';

const itemRouter = express.Router();

itemRouter.post('/', createItemvalidator, createItem);
itemRouter.get('/', getAllItems);

itemRouter.get('/:id', getItem);
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
