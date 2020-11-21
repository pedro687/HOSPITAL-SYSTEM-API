import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import PatientsController from '../controllers/PatientsController';
import ResponsiblePatientsController from '../controllers/ResponsiblePatientsController';

const patientsRouter = Router();
const patientsController = new PatientsController();
const responsiblePatientsController = new ResponsiblePatientsController();

patientsRouter.use(ensureAuthenticated);

patientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.string().required(),
      patology: Joi.string().required(),
    },
  }),
  patientsController.create,
);
patientsRouter.get('/', responsiblePatientsController.index);
patientsRouter.get(
  '/:patientId',
  celebrate({
    [Segments.PARAMS]: {
      patientId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  responsiblePatientsController.show,
);
patientsRouter.delete(
  '/:patientId',
  celebrate({
    [Segments.PARAMS]: {
      patientId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  responsiblePatientsController.delete,
);

export default patientsRouter;
