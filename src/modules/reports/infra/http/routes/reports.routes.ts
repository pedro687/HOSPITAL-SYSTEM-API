import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ReportsController from '../controllers/ReportsController';
import CaregiverReportsController from '../controllers/CaregiverReportsController';
import PatientReportsController from '../controllers/PatientReportsController';
import SolveReportsController from '../controllers/SolveReportsController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const reportsRouter = Router();
const reportsController = new ReportsController();
const caregiverReportsController = new CaregiverReportsController();
const patientReportsController = new PatientReportsController();
const solveReportsController = new SolveReportsController();

reportsRouter.use(ensureAuthenticated);

reportsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      description: Joi.string().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  reportsController.create,
);
reportsRouter.patch(
  '/solve/:report_id',
  celebrate({
    [Segments.PARAMS]: {
      report_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
    [Segments.BODY]: {
      solved: Joi.boolean().required(),
    },
  }),
  solveReportsController.update,
);

reportsRouter.get(
  '/:report_id',
  celebrate({
    [Segments.PARAMS]: {
      report_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  reportsController.show,
);
reportsRouter.get('/', caregiverReportsController.index);
reportsRouter.get(
  '/patients/:patient_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  patientReportsController.show,
);

export default reportsRouter;
