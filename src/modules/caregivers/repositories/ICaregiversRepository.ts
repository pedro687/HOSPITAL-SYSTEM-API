import ICreateCaregiverDTO from '../dtos/ICreateCaregiverDTO';

import Caregiver from '../infra/typeorm/entities/Caregiver';

export default interface ICaregiversRepository {
  findById(id: string): Promise<Caregiver | undefined>;
  findByIdWithEager(id: string): Promise<Caregiver | undefined>;
  findByUsername(username: string): Promise<Caregiver | undefined>;
  findByResponsibleId(responsible_id: string): Promise<Caregiver[]>;
  create({
    responsible_id,
    user_name,
    password,
    name,
    phone,
  }: ICreateCaregiverDTO): Promise<Caregiver>;
  save(caregiver: Caregiver): Promise<Caregiver>;
  delete(caregiver: Caregiver): Promise<Caregiver>;
}
