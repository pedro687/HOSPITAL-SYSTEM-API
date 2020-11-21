import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateResponsibleService from '../../../services/CreateResponsibleService';
import TurnResponsibleProService from '../../../services/TurnResponsibleProService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, cpf, phone } = request.body;

    const createResponsible = container.resolve(CreateResponsibleService);

    const createdResponsible = await createResponsible.execute({
      name,
      user_name: username,
      email,
      password,
      cpf,
      phone,
    });

    return response.json(classToClass(createdResponsible));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;

    const turnResponsiblePro = container.resolve(TurnResponsibleProService);

    const responsible = await turnResponsiblePro.execute({
      responsible_id,
    });

    delete responsible.password;

    return response.json(classToClass(responsible));
  }
}
