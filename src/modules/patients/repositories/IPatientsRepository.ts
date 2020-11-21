import ICreatePatientDTO from '../dtos/ICreatePatientDTO';

import Patient from '../infra/typeorm/entities/Patient';

export default interface IPatientsRepository {
  findById(id: string): Promise<Patient | undefined>;
  findByIdWithCaregivers(id: string): Promise<Patient | undefined>;
  findByResponsibleId(responsible_id: string): Promise<Patient[]>;
  create({
    responsible_id,
    name,
    age,
    patology,
  }: ICreatePatientDTO): Promise<Patient>;
  save(patient: Patient): Promise<Patient>;
  delete(patient: Patient): Promise<Patient>;
}
