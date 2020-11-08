import IPatientsDTO from '@modules/patients/DTOs/IPatientsDTO';

import Patients from '@modules/patients/infra/typeorm/entities/Patients';

export default interface IPatientsRepository {
  findById(id: string): Promise<Patients | undefined>;
  findAll(): Promise<Array<Patients | undefined>>;
  create({
    name,
    age,
    patology,
    cep,
    uf,
    city,
  }: IPatientsDTO): Promise<Patients>;
  save(patients: Patients): Promise<Patients>;
  delete(patients: Patients): Promise<Patients>;
}
