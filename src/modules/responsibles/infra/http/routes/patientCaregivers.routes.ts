import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientCaregiversController from '../controllers/PatientCaregiversController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const patientCaregiversRouter = Router();
const patientCaregiversController = new PatientCaregiversController();

patientCaregiversRouter.use(ensureAuthenticated);

patientCaregiversRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      caregiver_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  patientCaregiversController.create,
);

export default patientCaregiversRouter;
