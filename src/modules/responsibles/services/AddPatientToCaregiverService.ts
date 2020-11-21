import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';

interface IRequest {
  responsible_id: string;
  caregiver_id: string;
  patient_id: string;
}

@injectable()
export default class AuthenticateResponsibleService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  public async execute({
    responsible_id,
    caregiver_id,
    patient_id,
  }: IRequest): Promise<void> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists.');
    }

    const caregiverFound = await this.caregiversRepository.findByIdWithEager(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Caregiver not found.');
    }

    const caregiverResponsible = caregiverFound.responsibles.find(
      responsible => responsible.id === responsible_id,
    );

    if (!caregiverResponsible) {
      throw new AppError('Responsible does not exist on caregiver relation');
    }

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found.');
    }

    if (patientFound.responsible_id !== responsible_id) {
      throw new AppError('Responsible does not exists on patient relation.');
    }

    const caregiverPatient = caregiverFound.patients.find(
      patient => patient.id === patientFound.id,
    );

    if (caregiverPatient) {
      throw new AppError('Caregiver already associate to patient.');
    }

    caregiverFound.patients = [...caregiverFound.patients, patientFound];

    await this.caregiversRepository.save(caregiverFound);
  }
}
