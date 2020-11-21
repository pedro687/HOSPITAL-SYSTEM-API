import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResponsibleSessionsController from '../controllers/ResponsibleSessionsController';

const responsibleSessionsRouter = Router();
const responsibleSessionsController = new ResponsibleSessionsController();

responsibleSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().lowercase().regex(/^\S+$/).strict().required(),
      password: Joi.string().required(),
    },
  }),
  responsibleSessionsController.create,
);

export default responsibleSessionsRouter;
