export default interface ICreateMedicineAppointmentDTO {
  responsible_id: string;
  patient_id: string;
  medicine_name: string;
  dose: string;
  frequency: number;
  next_dose: Date;
}
