import { Router } from 'express';

import PatientsController from '@modules/patients/infra/http/controllers/patientController';

const PatientController = new PatientsController();
const Patientsrouter = Router();

Patientsrouter.post('/', PatientController.create);

export default Patientsrouter;

