import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import CaregiversController from '../controllers/CaregiversController';
import ResponsibleCaregiversController from '../controllers/ResponsibleCaregiversController';

const caregiversRouter = Router();
const caregiversController = new CaregiversController();
const responsibleCaregiversController = new ResponsibleCaregiversController();

caregiversRouter.use(ensureAuthenticated);

caregiversRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_name: Joi.string().lowercase().regex(/^\S+$/).strict().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().required(),
    },
  }),
  caregiversController.create,
);
caregiversRouter.get('/', responsibleCaregiversController.index);
caregiversRouter.get(
  '/:caregiverId',
  celebrate({
    [Segments.PARAMS]: Joi.string().uuid({ version: 'uuidv4' }).required(),
  }),
  responsibleCaregiversController.show,
);
caregiversRouter.delete(
  '/:caregiverId',
  celebrate({
    [Segments.PARAMS]: Joi.string().uuid({ version: 'uuidv4' }).required(),
  }),
  responsibleCaregiversController.delete,
);

export default caregiversRouter;
