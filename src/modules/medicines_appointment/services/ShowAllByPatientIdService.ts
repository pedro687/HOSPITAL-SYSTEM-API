import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';
import IMedicinesAppointmentRepository from '../repositories/IMedicinesAppointmentRepository';

import MedicineAppointment from '../infra/typeorm/entities/MedicineAppointment';

interface IRequest {
  user_id: string;
  patient_id: string;
}

@injectable()
export default class ShowAllByPatientIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('MedicinesAppointmentRepository')
    private medicinesAppointmentRepository: IMedicinesAppointmentRepository,
  ) {}

  public async execute({
    user_id,
    patient_id,
  }: IRequest): Promise<MedicineAppointment[]> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findById(user_id);

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated responsible/caregiver not found.');
    }

    const oneOfThem = isResponsible ? 'responsible_id' : 'caregiver_id';

    const patientFound = await this.patientsRepository.findByIdWithCaregivers(
      patient_id,
    );

    if (!patientFound) {
      throw new AppError('Patient not found.');
    }

    const caregiverFound = patientFound.caregivers.find(
      caregiver => caregiver.id === user_id,
    );

    if (patientFound[oneOfThem] !== user_id && !caregiverFound) {
      throw new AppError('Patient not found on responsible/caregiver relation');
    }

    return this.medicinesAppointmentRepository.findByPatientId(patient_id);
  }
}
