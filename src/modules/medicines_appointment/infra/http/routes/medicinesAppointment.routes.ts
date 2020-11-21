import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MedicineAppointmentsController from '../controllers/MedicineAppointmentsController';
import PatientMedicineAppointmentController from '../controllers/PatientMedicineAppointmentController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const medicinesAppointmentRouter = Router();
const medicineAppointmentsController = new MedicineAppointmentsController();
const patientMedicineAppointmentController = new PatientMedicineAppointmentController();

medicinesAppointmentRouter.use(ensureAuthenticated);

medicinesAppointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      medicine_name: Joi.string().required(),
      dose: Joi.string().required(),
      frequency: Joi.number().min(1).required(),
      next_dose: Joi.string().isoDate().required(),
    },
  }),
  medicineAppointmentsController.create,
);
medicinesAppointmentRouter.put(
  '/:medicine_appointment_id',
  celebrate({
    [Segments.PARAMS]: {
      medicine_appointment_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required(),
    },
    [Segments.BODY]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      medicine_name: Joi.string().required(),
      dose: Joi.string().required(),
      frequency: Joi.number().min(1).required(),
      next_dose: Joi.string().isoDate().required(),
    },
  }),
  medicineAppointmentsController.update,
);
medicinesAppointmentRouter.delete(
  '/:medicine_appointment_id',
  celebrate({
    [Segments.PARAMS]: {
      medicine_appointment_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required(),
    },
  }),
  medicineAppointmentsController.delete,
);

medicinesAppointmentRouter.get(
  '/patients/:patient_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  patientMedicineAppointmentController.index,
);
medicinesAppointmentRouter.get(
  '/patients/:patient_id/:medicine_appointment_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      medicine_appointment_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required(),
    },
  }),
  patientMedicineAppointmentController.show,
);
medicinesAppointmentRouter.patch(
  '/patients/:patient_id/:medicine_appointment_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      medicine_appointment_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required(),
    },
  }),
  patientMedicineAppointmentController.update,
);

export default medicinesAppointmentRouter;
