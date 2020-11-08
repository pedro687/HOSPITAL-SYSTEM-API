import { Router } from 'express';

import PatientsRouter from '@modules/patients/infra/http/routes/patient.routes';

const router = Router();

router.use('/patients', PatientsRouter);

export default router;
