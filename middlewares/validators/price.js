export const createPriceValidator = (req, res, next) => {
  const {
    organization_id,
    item_id,
    zone,
    base_distance_in_km,
    km_price,
    fix_price,
  } = req.body;

  if (!organization_id || !organization_id > 0) {
    const error = new Error('Provide valid OrganisationId');
    error.statusCode = 400;
    return next(error);
  }

  if (!item_id || !item_id > 0) {
    const error = new Error('Provide valid ItemId');
    error.statusCode = 400;
    return next(error);
  }

  if (!zone) {
    const error = new Error('Zone is required field');
    error.statusCode = 400;
    return next(error);
  }

  if (zone.length > 50) {
    const error = new Error('Zone should be less than 50 characters');
    error.statusCode = 400;
    return next(error);
  }

  if (!base_distance_in_km || !base_distance_in_km > 0) {
    const error = new Error('Provide valid BaseDistanceInKm');
    error.statusCode = 400;
    return next(error);
  }

  if (!km_price || km_price.length > 50) {
    const error = new Error('Provide valid KmPrice');
    error.statusCode = 400;
    return next(error);
  }

  if (!km_price.includes('/')) {
    const error = new Error(
      'km_price should be in the "perishable/non-perishable" string format. Eg: "1.5/5"',
    );
    error.statusCode = 400;
    return next(error);
  }

  const parts = km_price.split('/');

  if (parts.length > 2) {
    const error = new Error(
      'km_price should be in the "perishable/non-perishable" string format. Eg: "1.5/5"',
    );
    error.statusCode = 400;
    return next(error);
  }

  const firstPart = parseFloat(parts[0]);
  const secondPart = parseFloat(parts[1]);

  if (Number.isNaN(firstPart) || Number.isNaN(secondPart)) {
    const error = new Error(
      'km_price should be in the "perishable/non-perishable" string format. Eg: "1.5/5"',
    );
    error.statusCode = 400;
    return next(error);
  }

  if (!fix_price || !fix_price > 0) {
    const error = new Error('Provide valid FixPrice which should be a number');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export const validateCalculatePrice = (req, res, next) => {
  const {
    zone, organization_id, total_distance, item_type,
  } = req.body;

  if (!zone) {
    const error = new Error('Zone is required field');
    error.statusCode = 400;
    return next(error);
  }

  if (zone.length > 50) {
    const error = new Error('Zone should be less than 50 characters');
    error.statusCode = 400;
    return next(error);
  }

  if (!organization_id || !organization_id > 0) {
    const error = new Error('Provide valid OrganisationId');
    error.statusCode = 400;
    return next(error);
  }

  if (!total_distance || !total_distance > 0) {
    const error = new Error('Provide valid BaseDistanceInKm');
    error.statusCode = 400;
    return next(error);
  }

  if (item_type !== 'perishable' && item_type !== 'non-perishable') {
    const error = new Error(
      'Item type must be either perishable or non-perishable',
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
};
