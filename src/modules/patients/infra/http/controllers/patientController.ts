import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePatientService from '../../../services/CreatePatientService';

export default class PatientController {
  public async create(req: Request, res: Response): Promise<Response> {
    console.log("****************************************");
    console.log(req.body);
    const {
      name,
      age,
      patology,
      cep,
      uf,
      city,
    } = req.body;

    if (!name || !age || !patology || !cep || !uf || !city) {
      return res.status(401).json({ error: 'Have empty fields!' });
    }

    const createPatient = container.resolve(CreatePatientService);

    const createdPatient = await createPatient.execute({
      name,
      age,
      patology,
      cep,
      uf,
      city,
    });

    return res.json(classToClass(createdPatient));
  }
}
