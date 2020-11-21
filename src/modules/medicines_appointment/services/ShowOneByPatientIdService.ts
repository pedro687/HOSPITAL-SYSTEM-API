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
  medicine_appointment_id: string;
}

@injectable()
export default class ShowOneByPatientIdService {
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
    medicine_appointment_id,
  }: IRequest): Promise<MedicineAppointment> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findById(user_id);

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated responsible/caregiver not found.');
    }

    const oneOfThem = isResponsible ? 'responsible_id' : 'caregiver_id';

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found.');
    }

    if (patientFound[oneOfThem] !== user_id) {
      throw new AppError('Patient not found on responsible/caregiver relation');
    }

    const medicineAppointment = await this.medicinesAppointmentRepository.findById(
      medicine_appointment_id,
    );

    if (!medicineAppointment) {
      throw new AppError('No medicine appointment found');
    }

    if (medicineAppointment.patient_id !== patientFound.id) {
      throw new AppError(
        'Medicine appointment does not belongs to the patient',
      );
    }

    return medicineAppointment;
  }
}
