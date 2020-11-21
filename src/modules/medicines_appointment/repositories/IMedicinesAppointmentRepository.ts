import ICreateMedicineAppointmentDTO from '../dtos/ICreateMedicineAppointmentDTO';
import MedicineAppointment from '../infra/typeorm/entities/MedicineAppointment';

export default interface IMedicinesAppointmentRepository {
  findByPatientId(patient_id: string): Promise<MedicineAppointment[]>;
  findById(
    medicineAppointment_id: string,
  ): Promise<MedicineAppointment | undefined>;
  create({
    responsible_id,
    patient_id,
    medicine_name,
    dose,
    frequency,
    next_dose,
  }: ICreateMedicineAppointmentDTO): Promise<MedicineAppointment>;
  save(medicineAppointment: MedicineAppointment): Promise<MedicineAppointment>;
  delete(medicineAppointment: MedicineAppointment): Promise<void>;
}
