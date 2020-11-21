export default interface ICreateDoctorAppointmentDTO {
  responsible_id: string;
  patient_id: string;
  doctor_name: string;
  doctor_phone: string;
  doctor_specialty: string;
  date: Date;
}
