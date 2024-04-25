const createOrganisationValidator = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const error = new Error('Organisation name is required');
    error.statusCode = 400;
    return next(error);
  }

  if (name.length > 50) {
    const error = new Error(
      'Organisation name cannot be more than 255 characters',
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export default createOrganisationValidator;
