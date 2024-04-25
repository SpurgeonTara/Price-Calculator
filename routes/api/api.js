import express from 'express';

import organisationRoutes from '../organisation/organisation.js';
import itemRouter from '../item/item.js';
import priceRouter from '../price/price.js';

const app = express();

app.use('/organisation', organisationRoutes);
app.use('/item', itemRouter);
app.use('/price', priceRouter);

export default app;
