import { inject, injectable } from 'tsyringe';

//Entities
import Patients from '@modules/patients/infra/typeorm/entities/Patients';

//Interfaces
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string | undefined;
  age: number | undefined;
  patology: string | undefined;
  cep: string | undefined;
  uf: string | undefined;
  city: string | undefined;
}

@injectable()
export default class CreatePatientService {
  private patientsRepository: IPatientsRepository;

  constructor (
    @inject('PatientRepository')
    patientsRepository: IPatientsRepository,
  ){
    this.patientsRepository = patientsRepository;
  }

  public async execute({
    name,
    age,
    cep,
    city,
    patology,
    uf,
  }: IRequest): Promise<Patients> {
    const patient = await this.patientsRepository.create({
      name,
      age,
      cep,
      city,
      patology,
      uf,
    });

    if (!name || !age || !patology || !cep || !uf || !city) {
      throw new AppError('Have empty fields', 401);
    }

    return patient;
  }
}
