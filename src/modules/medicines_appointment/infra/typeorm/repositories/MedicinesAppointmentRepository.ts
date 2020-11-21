import { Repository, getRepository } from 'typeorm';

import IMedicinesAppointmentRepository from '../../../repositories/IMedicinesAppointmentRepository';

import MedicineAppointment from '../entities/MedicineAppointment';
import ICreateMedicineAppointmentDTO from '../../../dtos/ICreateMedicineAppointmentDTO';

export default class MedicinesAppointmentRepository
  implements IMedicinesAppointmentRepository {
  private ormRepository: Repository<MedicineAppointment>;

  constructor() {
    this.ormRepository = getRepository(MedicineAppointment);
  }

  public async findById(
    medicineAppointment_id: string,
  ): Promise<MedicineAppointment | undefined> {
    return this.ormRepository.findOne(medicineAppointment_id);
  }

  public async findByPatientId(
    patient_id: string,
  ): Promise<MedicineAppointment[]> {
    return this.ormRepository.find({
      where: {
        patient_id,
      },
    });
  }

  public async create({
    responsible_id,
    patient_id,
    medicine_name,
    dose,
    frequency,
    next_dose,
  }: ICreateMedicineAppointmentDTO): Promise<MedicineAppointment> {
    const medicineAppointment = this.ormRepository.create({
      responsible_id,
      patient_id,
      medicine_name,
      dose,
      frequency,
      next_dose,
    });

    return this.ormRepository.save(medicineAppointment);
  }

  public async save(
    medicineAppointment: MedicineAppointment,
  ): Promise<MedicineAppointment> {
    return this.ormRepository.save(medicineAppointment);
  }

  public async delete(medicineAppointment: MedicineAppointment): Promise<void> {
    await this.ormRepository.remove(medicineAppointment);
  }
}
