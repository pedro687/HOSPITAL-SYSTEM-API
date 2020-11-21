import { Repository, getRepository } from 'typeorm';

import ICreatePatientDTO from '../../../dtos/ICreatePatientDTO';
import IPatientsRepository from '../../../repositories/IPatientsRepository';

import Patient from '../entities/Patient';

export default class PatientsRepository implements IPatientsRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = getRepository(Patient);
  }

  public async findById(id: string): Promise<Patient | undefined> {
    const patientFound = await this.ormRepository.findOne(id);

    return patientFound;
  }

  public async findByIdWithCaregivers(
    id: string,
  ): Promise<Patient | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['caregivers'],
    });
  }

  public async findByResponsibleId(responsible_id: string): Promise<Patient[]> {
    const patientsFound = await this.ormRepository.find({
      where: { responsible_id },
    });

    return patientsFound;
  }

  public async create({
    responsible_id,
    name,
    age,
    patology,
  }: ICreatePatientDTO): Promise<Patient> {
    const createdPatient = this.ormRepository.create({
      responsible_id,
      name,
      age,
      patology,
    });

    const savedPatient = await this.ormRepository.save(createdPatient);

    return savedPatient;
  }

  public async save(patient: Patient): Promise<Patient> {
    return this.ormRepository.save(patient);
  }

  public async delete(patient: Patient): Promise<Patient> {
    return this.ormRepository.remove(patient);
  }
}
