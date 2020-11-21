import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICreateCaregiverDTO from '../../../dtos/ICreateCaregiverDTO';

import CreateCaregiverService from '../../../services/CreateCaregiverService';

export default class CaregiversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const {
      name,
      user_name,
      password,
      phone,
    } = request.body as ICreateCaregiverDTO;

    const createCaregiver = container.resolve(CreateCaregiverService);

    const createdCaregiver = await createCaregiver.execute({
      responsible_id,
      name,
      user_name,
      password,
      phone,
    });

    return response.json(classToClass(createdCaregiver));
  }
}
