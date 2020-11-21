import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientsCaregiverController from '../controllers/PatientsCaregiverController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const caregiverPatientsRouter = Router();
const patientsCaregiverController = new PatientsCaregiverController();

caregiverPatientsRouter.use(ensureAuthenticated);

caregiverPatientsRouter.get('/', patientsCaregiverController.index);
caregiverPatientsRouter.get(
  '/:patient_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  patientsCaregiverController.show,
);

export default caregiverPatientsRouter;
