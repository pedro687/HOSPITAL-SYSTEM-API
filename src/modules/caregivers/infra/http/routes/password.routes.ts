import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const caregiverPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

caregiverPasswordRouter.post('/forgot', forgotPasswordController.create);

export default caregiverPasswordRouter;
