import ICreateDoctorAppointmentDTO from '../dtos/ICreateDoctorAppointmentDTO';
import DoctorAppointment from '../infra/typeorm/entities/DoctorAppointment';

export default interface IDoctorAppointmentsRepository {
  findById(
    doctor_appointment_id: string,
  ): Promise<DoctorAppointment | undefined>;
  findAllByResponsibleId(responsible_id: string): Promise<DoctorAppointment[]>;
  findAllByPatientId(patient_id: string): Promise<DoctorAppointment[]>;
  create({
    responsible_id,
    patient_id,
    doctor_name,
    doctor_phone,
    doctor_specialty,
    date,
  }: ICreateDoctorAppointmentDTO): Promise<DoctorAppointment>;
  save(doctorAppointment: DoctorAppointment): Promise<DoctorAppointment>;
  delete(doctorAppointment: DoctorAppointment): Promise<void>;
}
