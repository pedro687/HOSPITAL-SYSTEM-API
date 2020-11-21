import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import DoctorAppointmentsController from '../controllers/DoctorAppointmentsController';
import PatientDoctorAppointmentsController from '../controllers/PatientDoctorAppointmentsController';
import ResponsibleDoctorAppointmentsController from '../controllers/ResponsibleDoctorAppointmentsController';

const doctorAppointmentsRouter = Router();
const doctorAppointmentsController = new DoctorAppointmentsController();
const patientDoctorAppointmentsController = new PatientDoctorAppointmentsController();
const responsibleDoctorAppointmentsController = new ResponsibleDoctorAppointmentsController();

doctorAppointmentsRouter.use(ensureAuthenticated);

doctorAppointmentsRouter.get(
  '/',
  responsibleDoctorAppointmentsController.index,
);
doctorAppointmentsRouter.get(
  '/:doctor_appointment_id',
  celebrate({
    [Segments.PARAMS]: {
      doctor_appointment_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required(),
    },
  }),
  doctorAppointmentsController.show,
);
doctorAppointmentsRouter.get(
  '/patient/:patient_id',
  celebrate({
    [Segments.PARAMS]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  patientDoctorAppointmentsController.index,
);

doctorAppointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      patient_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      doctor_name: Joi.string().required(),
      doctor_phone: Joi.string().required(),
      doctor_specialty: Joi.string().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  doctorAppointmentsController.create,
);

export default doctorAppointmentsRouter;
