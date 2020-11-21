import { Router } from 'express';

import responsiblesRouter from '../../../../modules/responsibles/infra/http/routes/responsibles.routes';
import responsibleSessionsRouter from '../../../../modules/responsibles/infra/http/routes/responsibleSessions.routes';
import patientCaregiversRouter from '../../../../modules/responsibles/infra/http/routes/patientCaregivers.routes';
import responsiblePasswordRouter from '../../../../modules/responsibles/infra/http/routes/password.routes';
import patientsRouter from '../../../../modules/patients/infra/http/routes/patients.routes';
import caregiversRouter from '../../../../modules/caregivers/infra/http/routes/caregivers.routes';
import caregiverPasswordRouter from '../../../../modules/caregivers/infra/http/routes/password.routes';
import caregiversSessionsRouter from '../../../../modules/caregivers/infra/http/routes/caregiverSessions.routes';
import caregiverPatientsRouter from '../../../../modules/caregivers/infra/http/routes/caregiverPatients.routes';
// import medicinesRouter from '../../../../modules/medicines/infra/http/routes/medicines.routes';
import medicinesAppointmentRouter from '../../../../modules/medicines_appointment/infra/http/routes/medicinesAppointment.routes';
import doctorAppointmentsRouter from '../../../../modules/doctor_appointments/infra/http/routes/doctorAppointments.routes';
import reportsRouter from '../../../../modules/reports/infra/http/routes/reports.routes';

const routes = Router();

routes.use('/responsibles', responsiblesRouter);
routes.use('/responsibles/sessions', responsibleSessionsRouter);
routes.use('/responsibles/caregivers', patientCaregiversRouter);
routes.use('/responsibles/password', responsiblePasswordRouter);

routes.use('/patients', patientsRouter);

routes.use('/caregivers/sessions', caregiversSessionsRouter);
routes.use('/caregivers/patients', caregiverPatientsRouter);
routes.use('/caregivers/password', caregiverPasswordRouter);
routes.use('/caregivers', caregiversRouter);

// routes.use('/medicines', medicinesRouter);

routes.use('/medicines-appointment', medicinesAppointmentRouter);

routes.use('/doctor-appointments', doctorAppointmentsRouter);

routes.use('/reports', reportsRouter);

export default routes;
