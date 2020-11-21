import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IReportsRepository from '../repositories/IReportsRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';

import Report from '../infra/typeorm/entities/Report';
import Patient from '../../patients/infra/typeorm/entities/Patient';

interface IRequest {
  user_id: string;
  patient_id: string;
}

@injectable()
export default class ShowAllFromPatientIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute({ user_id, patient_id }: IRequest): Promise<Report[]> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findById(user_id);

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated user does not exists');
    }

    const oneOfThem = isResponsible ? 'responsible' : 'caregiver';

    const reference = {
      responsible: {
        method: this.patientsRepository.findByResponsibleId(user_id),
      },
      caregiver: {
        method: this.patientsRepository.findByIdWithCaregivers(patient_id),
      },
    };

    const patientFound = await reference[oneOfThem].method;

    if (!patientFound) {
      throw new AppError('Patient does not exists on caregiver relation');
    }

    if (oneOfThem === 'caregiver') {
      const parsedPatient = patientFound as Patient;

      const caregiverExists = !!parsedPatient.caregivers.find(
        caregiver => caregiver.id === user_id,
      );

      if (!caregiverExists) {
        throw new AppError('Caregiver does not exists on patient relation');
      }
    } else {
      const parsedPatients = patientFound as Patient[];

      const patientExists = !!parsedPatients.find(
        patient => patient.id === patient_id,
      );

      if (!patientExists) {
        throw new AppError('Patient does not exists on responsible relation');
      }
    }

    const reports = await this.reportsRepository.findByPatientId(patient_id);

    return reports;
  }
}
