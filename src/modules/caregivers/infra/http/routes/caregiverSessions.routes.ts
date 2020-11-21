import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CaregiverSessionsController from '../controllers/CaregiverSessionsController';

const caregiverSessionsRouter = Router();
const caregiverSessionsController = new CaregiverSessionsController();

caregiverSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  caregiverSessionsController.create,
);

export default caregiverSessionsRouter;
