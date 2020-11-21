import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPatientsRepository from '../repositories/IPatientsRepository';
import IResponsibleRepository from '../../responsibles/repositories/IResponsiblesRepository';

import Patient from '../infra/typeorm/entities/Patient';

interface IRequest {
  responsible_id: string;
  name: string;
  age: string;
  patology: string;
}

@injectable()
export default class CreatePatientService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsibleRepository,
  ) {}

  public async execute({
    responsible_id,
    name,
    age,
    patology,
  }: IRequest): Promise<Patient> {
    const checkResponsibleExists = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!checkResponsibleExists) {
      throw new AppError('Responsible authenticated does not exists');
    }

    const patientsOfResponsibles = await this.patientsRepository.findByResponsibleId(
      responsible_id,
    );

    if (patientsOfResponsibles.length === 2) {
      throw new AppError('Maximum caregivers amount reached');
    }

    const patient = await this.patientsRepository.create({
      responsible_id,
      name,
      age,
      patology,
    });

    return patient;
  }
}
