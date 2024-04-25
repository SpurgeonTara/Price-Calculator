import Item from '../models/item.js';

export const createItem = async (req, res, next) => {
  const item = new Item(req.body.type, req.body.description);

  try {
    const newItem = await item.save();
    res.status(201).json({
      message: 'Item is created Successfully',
      item: newItem,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

export const getAllItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.findAll();
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  return res.status(200).json({
    message: 'Items are fetched successfully',
    items,
  });
};

export const getItem = async (req, res, next) => {
  const { id } = req.params;

  let item;
  try {
    item = await Item.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const finalItem = item[0];

  if (!finalItem) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    message: 'Item fetched Successfully',
    item: finalItem,
  });
};

export const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  let item;
  try {
    item = await Item.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const finalItem = item[0];

  if (!finalItem) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  try {
    await Item.destroy(finalItem.id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(200).json({
    message: 'Item deleted Successfully',
    itemId: finalItem.id,
  });
};
