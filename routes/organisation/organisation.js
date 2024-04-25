import express from 'express';

import createOrganisationValidator from '../../middlewares/validators/organisation.js';
import {
  postOrganisation,
  getAllOrganisations,
  getOrganisations,
  deleteOrg,
} from '../../controllers/organisation.js';

const organisationRoute = express.Router();

organisationRoute.post('/', createOrganisationValidator, postOrganisation);

organisationRoute.get('/', getAllOrganisations);

organisationRoute.get('/:id', getOrganisations);
organisationRoute.delete('/:id', deleteOrg);

export default organisationRoute;
