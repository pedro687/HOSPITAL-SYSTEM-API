import { Repository, getRepository } from 'typeorm';

import ICreatePatientsDTO from '@modules/patients/DTOs/IPatientsDTO';
import IPatientsRepository from '@modules/patients/repositories/IPatientsRepository';

import Patients from '../entities/Patients';
import AppError from '@shared/errors/AppError';

export default class PatientsRepository implements IPatientsRepository {
  private ormRepository: Repository<Patients>;

  constructor() {
    this.ormRepository = getRepository(Patients);
  }
  delete(patients: Patients): Promise<Patients> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<Patients | undefined> {
    const patientFound = await this.ormRepository.findOne(id);

    return patientFound;
  }

  public async findAll(): Promise<Array<Patients | undefined>> {
    const patientFound = await this.ormRepository.find();

    return patientFound;
  }

  public async create({
    name,
    age,
    cep,
    city,
    patology,
    uf
  }: ICreatePatientsDTO): Promise<Patients> {
    if (!name || !age || !patology || !cep || !uf || !city) {
      throw new AppError('Have empty fields!', 401);
    }

    const createdPatient = this.ormRepository.create({
      name,
      age,
      cep,
      city,
      patology,
      uf,
    });

    await this.ormRepository.save(createdPatient);

    return createdPatient;
  }

  public async save(patient: Patients): Promise<Patients> {
    return this.ormRepository.save(patient);
  }

  public async remove(patient: Patients): Promise<Patients> {
    return this.ormRepository.remove(patient);
  }
}
