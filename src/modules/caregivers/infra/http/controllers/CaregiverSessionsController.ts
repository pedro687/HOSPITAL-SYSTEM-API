import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateCaregiverService from '../../../services/AuthenticateCaregiverService';

export default class CaregiverSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateCaregiver = container.resolve(
      AuthenticateCaregiverService,
    );

    const { caregiver, token } = await authenticateCaregiver.execute({
      username,
      password,
    });

    return response.json({ caregiver: classToClass(caregiver), token });
  }
}
