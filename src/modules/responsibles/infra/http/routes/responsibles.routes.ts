import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { validator } from 'cpf-cnpj-validator';

import ResponsiblesController from '../controllers/ResponsiblesController';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const responsiblesRouter = Router();
const responsiblesController = new ResponsiblesController();

responsiblesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().lowercase().regex(/^\S+$/).strict().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      cpf: Joi.extend(validator)
        .document()
        .cpf()
        .required()
        .error(new Error('A valid CPF must be provided')),
      phone: Joi.string().required(),
    },
  }),
  responsiblesController.create,
);

responsiblesRouter.patch(
  '/pro',
  ensureAuthenticated,
  responsiblesController.update,
);

export default responsiblesRouter;
