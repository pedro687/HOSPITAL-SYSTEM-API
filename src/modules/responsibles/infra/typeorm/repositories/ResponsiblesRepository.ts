import { Repository, getRepository } from 'typeorm';

import ICreateResponsibleDTO from '../../../dtos/ICreateResponsibleDTO';
import IResponsiblesRepository from '../../../repositories/IResponsiblesRepository';

import Responsible from '../entities/Responsible';

export default class ResponsiblesRepository implements IResponsiblesRepository {
  private ormRepository: Repository<Responsible>;

  constructor() {
    this.ormRepository = getRepository(Responsible);
  }

  public async findById(id: string): Promise<Responsible | undefined> {
    const userFound = await this.ormRepository.findOne(id, {
      relations: ['caregivers'],
    });

    return userFound;
  }

  public async findByUsername(
    user_name: string,
  ): Promise<Responsible | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { user_name },
    });

    return userFound;
  }

  public async findByEmail(email: string): Promise<Responsible | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { email },
    });

    return userFound;
  }

  public async findByCpf(cpf: string): Promise<Responsible | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { cpf },
    });

    return userFound;
  }

  public async create({
    name,
    user_name,
    email,
    password,
    cpf,
    phone,
  }: ICreateResponsibleDTO): Promise<Responsible> {
    const createdUser = this.ormRepository.create({
      name,
      user_name,
      email,
      password,
      cpf,
      phone,
      pro: false,
    });

    const savedUser = await this.ormRepository.save(createdUser);

    return savedUser;
  }

  public async save(user: Responsible): Promise<Responsible> {
    return this.ormRepository.save(user);
  }

  public async delete(user: Responsible): Promise<Responsible> {
    return this.ormRepository.remove(user);
  }
}
