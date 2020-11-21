import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IPatientsRepository from '../repositories/IPatientsRepository';

interface IRequest {
  responsible_id: string;
  patient_id: string;
}

interface IResponse {
  message: string;
  patient_name: string;
}

@injectable()
export default class DeletePatientService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute({
    responsible_id,
    patient_id,
  }: IRequest): Promise<IResponse> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible authenticated does not exists');
    }

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    if (patientFound.responsible_id !== responsibleFound.id) {
      throw new AppError('Patient does not exists on responsible relation');
    }

    const deletedPatient = await this.patientsRepository.delete(patientFound);

    return {
      message: 'Patient successfully deleted',
      patient_name: deletedPatient.name,
    } as IResponse;
  }
}
