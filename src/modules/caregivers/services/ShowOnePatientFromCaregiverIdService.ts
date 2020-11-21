import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../repositories/ICaregiversRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';

import Patient from '../../patients/infra/typeorm/entities/Patient';

interface IRequest {
  caregiver_id: string;
  patient_id: string;
}

interface IResponse extends Patient {
  responsible_name: string;
}

@injectable()
export default class ShowOnePatientFromCaregiverIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,
  ) {}

  public async execute({
    caregiver_id,
    patient_id,
  }: IRequest): Promise<IResponse> {
    const caregiverFound = await this.caregiversRepository.findByIdWithEager(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Authenticated caregiver does not exists');
    }

    const patientFound = caregiverFound.patients.find(
      patient => patient.id === patient_id,
    );

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    const responsibleFound = await this.responsiblesRepository.findById(
      patientFound.responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible of this patient was not found.');
    }

    const { name } = responsibleFound;

    return {
      ...patientFound,
      responsible_name: name,
    };
  }
}
