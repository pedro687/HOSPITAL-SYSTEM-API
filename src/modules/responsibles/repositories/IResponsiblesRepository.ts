import ICreateResponsibleDTO from '../dtos/ICreateResponsibleDTO';

import Responsible from '../infra/typeorm/entities/Responsible';

export default interface IResponsiblesRepository {
  findById(id: string): Promise<Responsible | undefined>;
  findByEmail(email: string): Promise<Responsible | undefined>;
  findByCpf(cpf: string): Promise<Responsible | undefined>;
  findByUsername(user_name: string): Promise<Responsible | undefined>;
  create({
    name,
    user_name,
    email,
    password,
    cpf,
    phone,
  }: ICreateResponsibleDTO): Promise<Responsible>;
  save(responsible: Responsible): Promise<Responsible>;
  delete(responsible: Responsible): Promise<Responsible>;
}
