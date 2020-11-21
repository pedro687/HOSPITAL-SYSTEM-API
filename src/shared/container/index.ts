import { container } from 'tsyringe';

import './providers';

import IResponsiblesRepository from '../../modules/responsibles/repositories/IResponsiblesRepository';
import ResponsiblesRepository from '../../modules/responsibles/infra/typeorm/repositories/ResponsiblesRepository';

import IResponsibleTokensRepository from '../../modules/responsibles/repositories/IResponsibleTokensRepository';
import ResponsibleTokensRepository from '../../modules/responsibles/infra/typeorm/repositories/ResponsibleTokensRepository';

import IPatientsRepository from '../../modules/patients/repositories/IPatientsRepository';
import PatientsRepository from '../../modules/patients/infra/typeorm/repositories/PatientsRepository';

import ICaregiversRepository from '../../modules/caregivers/repositories/ICaregiversRepository';
import CaregiversRepository from '../../modules/caregivers/infra/typeorm/repositories/CaregiversRepository';

import ICaregiverTokensRepository from '../../modules/caregivers/repositories/ICaregiverTokensRepository';
import CaregiverTokensRepository from '../../modules/caregivers/infra/typeorm/repositories/CaregiverTokensRepository';

// import IMedicinesRepository from '../../modules/medicines/repositories/IMedicinesRepository';
// import MedicinesRepository from '../../modules/medicines/infra/typeorm/repositories/MedicinesRepository';

import IMedicinesAppointmentRepository from '../../modules/medicines_appointment/repositories/IMedicinesAppointmentRepository';
import MedicinesAppointmentRepository from '../../modules/medicines_appointment/infra/typeorm/repositories/MedicinesAppointmentRepository';

import IDoctorAppointmentsRepository from '../../modules/doctor_appointments/repositories/IDoctorAppointmentsRepository';
import DoctorAppointmentsRepository from '../../modules/doctor_appointments/infra/typeorm/repositories/DoctorAppointmentsRepository';

import IReportsRepository from '../../modules/reports/repositories/IReportsRepository';
import ReportsRepository from '../../modules/reports/infra/typeorm/repositories/ReportsRepository';

container.registerSingleton<IResponsiblesRepository>(
  'ResponsiblesRepository',
  ResponsiblesRepository,
);

container.registerSingleton<IResponsibleTokensRepository>(
  'ResponsibleTokensRepository',
  ResponsibleTokensRepository,
);

container.registerSingleton<IPatientsRepository>(
  'PatientsRepository',
  PatientsRepository,
);

container.registerSingleton<ICaregiversRepository>(
  'CaregiversRepository',
  CaregiversRepository,
);

container.registerSingleton<ICaregiverTokensRepository>(
  'CaregiverTokensRepository',
  CaregiverTokensRepository,
);

// container.registerSingleton<IMedicinesRepository>(
//   'MedicinesRepository',
//   MedicinesRepository,
// );

container.registerSingleton<IMedicinesAppointmentRepository>(
  'MedicinesAppointmentRepository',
  MedicinesAppointmentRepository,
);

container.registerSingleton<IDoctorAppointmentsRepository>(
  'DoctorAppointmentsRepository',
  DoctorAppointmentsRepository,
);

container.registerSingleton<IReportsRepository>(
  'ReportsRepository',
  ReportsRepository,
);
