import { Repository, getRepository } from 'typeorm';

import ICreateDoctorAppointmentDTO from '../../../dtos/ICreateDoctorAppointmentDTO';
import IDoctorAppointmentsRepository from '../../../repositories/IDoctorAppointmentsRepository';

import DoctorAppointment from '../entities/DoctorAppointment';

export default class DoctorAppointmentsRepository
  implements IDoctorAppointmentsRepository {
  private ormRepository: Repository<DoctorAppointment>;

  constructor() {
    this.ormRepository = getRepository(DoctorAppointment);
  }

  public async findById(
    doctor_appointment_id: string,
  ): Promise<DoctorAppointment | undefined> {
    return this.ormRepository.findOne(doctor_appointment_id);
  }

  public async findAllByResponsibleId(
    responsible_id: string,
  ): Promise<DoctorAppointment[]> {
    return this.ormRepository.find({
      where: { responsible_id },
    });
  }

  public async findAllByPatientId(
    patient_id: string,
  ): Promise<DoctorAppointment[]> {
    return this.ormRepository.find({
      where: {
        patient_id,
      },
    });
  }

  public async create({
    responsible_id,
    patient_id,
    doctor_name,
    doctor_phone,
    doctor_specialty,
    date,
  }: ICreateDoctorAppointmentDTO): Promise<DoctorAppointment> {
    const doctorAppointment = this.ormRepository.create({
      responsible_id,
      patient_id,
      doctor_name,
      doctor_phone,
      doctor_specialty,
      date,
    });

    return this.ormRepository.save(doctorAppointment);
  }

  public async save(
    doctorAppointment: DoctorAppointment,
  ): Promise<DoctorAppointment> {
    return this.ormRepository.save(doctorAppointment);
  }

  public async delete(doctorAppointment: DoctorAppointment): Promise<void> {
    await this.ormRepository.remove(doctorAppointment);
  }
}
