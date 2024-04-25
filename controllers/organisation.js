import Organisation from '../models/organisation.js';

export const postOrganisation = async (req, res, next) => {
  const { name } = req.body;

  let existingOrganisation;
  try {
    existingOrganisation = await Organisation.findByName(name);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (existingOrganisation[0]) {
    const error = new Error(
      `Organisation with the name: '${existingOrganisation[0].name}' already exists`,
    );
    error.statusCode = 400;
    return next(error);
  }

  const organisation = new Organisation(name);

  let savedOrganisation;
  try {
    savedOrganisation = await organisation.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(201).json({
    message: 'Organisation created successfully',
    organisation: savedOrganisation,
  });
};

export const getAllOrganisations = async (req, res, next) => {
  let orgs;
  try {
    orgs = await Organisation.findAll();
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  return res.status(200).json({
    message: 'Organisations are fetched successfully',
    organisations: orgs,
  });
};

export const getOrganisations = async (req, res, next) => {
  const { id } = req.params;

  let org;
  try {
    org = await Organisation.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const organisation = org[0];

  if (!organisation) {
    const error = new Error('Organisation not found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    message: 'Organisation fetched Successfully',
    organisation,
  });
};

export const deleteOrg = async (req, res, next) => {
  const { id } = req.params;

  let org;
  try {
    org = await Organisation.findById(id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  const organisation = org[0];

  if (!organisation) {
    const error = new Error('Organisation not found');
    error.statusCode = 404;
    return next(error);
  }

  try {
    await Organisation.destroy(organisation.id);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(200).json({
    message: 'Organisation deleted Successfully',
    orgId: organisation.id,
  });
};
