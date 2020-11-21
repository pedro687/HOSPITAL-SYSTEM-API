import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPatientsRepository from '../repositories/IPatientsRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';

import Patient from '../infra/typeorm/entities/Patient';

interface IRequest {
  patient_id: string;
  responsible_id: string;
}

@injectable()
export default class ShowPatientByIdService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,
  ) {}

  public async execute({
    patient_id,
    responsible_id,
  }: IRequest): Promise<Patient> {
    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found', 404);
    }

    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists', 404);
    }

    if (patientFound.responsible_id !== responsibleFound.id) {
      throw new AppError('Patient does not exists on responsible relation');
    }
    return patientFound;
  }
}
