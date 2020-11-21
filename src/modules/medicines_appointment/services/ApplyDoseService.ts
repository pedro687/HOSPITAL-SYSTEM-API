import { injectable, inject } from 'tsyringe';
import { addHours } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import IMedicinesAppointmentRepository from '../repositories/IMedicinesAppointmentRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';

import MedicineAppointment from '../infra/typeorm/entities/MedicineAppointment';

interface IRequest {
  medicine_appointment_id: string;
  user_id: string;
  patient_id: string;
}

@injectable()
export default class ApplyDoseService {
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

    if (!isResponsible && isCaregiver) {
      throw new AppError('Authenticated caregiver/responsible does not exists');
    }

    const oneOfThem = isResponsible ? 'responsible_id' : 'caregiver_id';

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    if (patientFound[oneOfThem] !== user_id) {
      throw new AppError(
        'Patient does not exists on caregiver/responsible relation',
      );
    }

    const medicineAppointment = await this.medicinesAppointmentRepository.findById(
      medicine_appointment_id,
    );

    if (!medicineAppointment) {
      throw new AppError('Medicine appointment not found.');
    }

    if (medicineAppointment.patient_id !== patientFound.id) {
      throw new AppError(
        'Patient does not exists on madicine appointment relation.',
      );
    }

    const { next_dose, frequency } = medicineAppointment;

    const updatedNextDose = addHours(next_dose, frequency);

    medicineAppointment.next_dose = updatedNextDose;

    return this.medicinesAppointmentRepository.save(medicineAppointment);
  }
}
