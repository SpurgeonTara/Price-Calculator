const createItemvalidator = (req, res, next) => {
  const { type, description } = req.body;

  if (type !== 'perishable' && type !== 'non-perishable') {
    const error = new Error(
      'Item type must be either perishable or non-perishable',
    );
    error.statusCode = 400;
    return next(error);
  }

  if (!description) {
    const error = new Error('Item description is required');
    error.statusCode = 400;
    return next(error);
  }

  if (description.length > 512) {
    const error = new Error('Item description cannot have length > 512');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export default createItemvalidator;
