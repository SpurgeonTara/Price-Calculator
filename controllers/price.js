import Price from '../models/price.js';
import db from '../database/db.js';

import PriceCalculator from '../services/PriceCalculator.js';

export const createPrice = async (req, res, next) => {
  const {
    organization_id,
    item_id,
    zone,
    base_distance_in_km,
    km_price,
    fix_price,
  } = req.body;

  let existingPrice;
  try {
    [existingPrice] = await Price.findPriceByOrgAndZone(organization_id, zone);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

  if (existingPrice) {
    const error = new Error(
      `A price with organisationId: '${existingPrice.organization_id}' and zone: '${existingPrice.zone}' already exists`,
    );
    error.statusCode = 400;
    return next(error);
  }

  try {
    const price = new Price(
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      fix_price,
    );

    const savedPrice = await price.save();

    res.status(201).json({
      message: 'Price created successfully',
      price: savedPrice,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getAllPrices = async (req, res, next) => {
  let prices;
  try {
    prices = await Price.findAll();
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  return res.status(200).json({
    message: 'Prices are fetched successfully',
    prices,
  });
};

export const getPrice = async (req, res, next) => {
  const { id } = req.params;

  let price;
  try {
    price = await Price.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const finalPrice = price[0];

  if (!finalPrice) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    message: 'Price fetched Successfully',
    price: finalPrice,
  });
};

export const deletePrice = async (req, res, next) => {
  const { id } = req.params;

  let price;
  try {
    price = await Price.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const finalPrice = price[0];

  if (!finalPrice) {
    const error = new Error('Price not found');
    error.statusCode = 404;
    return next(error);
  }

  try {
    await Price.destroy(finalPrice.id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(200).json({
    message: 'Price deleted Successfully',
    priceId: finalPrice.id,
  });
};

export const calculatePrice = async (req, res, next) => {
  const {
    zone, organization_id, total_distance, item_type,
  } = req.body;

  const client = await db.connect();

  const query = `
        SELECT p.*, i.type AS item_type
        FROM public."Price" p 
        INNER JOIN public."Item" i ON p.item_id = i.id
        WHERE p.organization_id = $1 AND p.zone = $2 AND i.type = $3
      `;
  const values = [organization_id, zone, item_type];

  let price_data;
  try {
    const result = await client.query(query, values);
    [price_data] = result.rows;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (!price_data) {
    const error = new Error(
      `We Cant find any price record for the given attributes: zone:${zone}, organization_id:${organization_id}, item_type:${item_type}. Please Provide Valid Info`,
    );
    error.statusCode = 404;
    return next(error);
  }

  const priceCalculator = new PriceCalculator();
  const total_price = priceCalculator.calculateTotalPrice(
    total_distance,
    price_data.base_distance_in_km,
    price_data.km_price,
    price_data.fix_price,
    price_data.item_type,
  );

  client.release();
  res.json({ total_price, currency: 'cents' });
};
