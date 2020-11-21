import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreatePatientService from '../../../services/CreatePatientService';

export default class PatientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, age, patology } = request.body;
    const responsible_id = request.user.id;

    const createPatient = container.resolve(CreatePatientService);

    const createdPatient = await createPatient.execute({
      responsible_id,
      name,
      age,
      patology,
    });

    return response.json(classToClass(createdPatient));
  }
}
