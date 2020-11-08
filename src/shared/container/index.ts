import { container } from 'tsyringe';

import IPatientRepository from '@modules/patients/repositories/IPatientsRepository';
import PatientRepository from '@modules/patients/infra/typeorm/repositories/PatientsRepository';

container.registerSingleton<IPatientRepository>(
  'PatientRepository',
  PatientRepository,
);
