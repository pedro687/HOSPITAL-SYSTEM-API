import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateResponsibleService from '../../../services/AuthenticateResponsibleService';

export default class ResponsibleSessions {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateResponsible = container.resolve(
      AuthenticateResponsibleService,
    );

    const { responsible, token } = await authenticateResponsible.execute({
      username,
      password,
    });

    return response.json({ responsible: classToClass(responsible), token });
  }
}
