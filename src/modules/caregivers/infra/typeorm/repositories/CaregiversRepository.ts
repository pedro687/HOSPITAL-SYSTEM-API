import { Repository, getRepository } from 'typeorm';

import ICaregiversRepository from '../../../repositories/ICaregiversRepository';

import Caregiver from '../entities/Caregiver';
import ICreateCaregiverDTO from '../../../dtos/ICreateCaregiverDTO';

export default class CaregiversRepository implements ICaregiversRepository {
  private ormRepository: Repository<Caregiver>;

  constructor() {
    this.ormRepository = getRepository(Caregiver);
  }

  public async findById(id: string): Promise<Caregiver | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByIdWithEager(id: string): Promise<Caregiver | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['responsibles', 'patients'],
    });
  }

  public async findByUsername(
    username: string,
  ): Promise<Caregiver | undefined> {
    return this.ormRepository.findOne({
      where: { user_name: username },
    });
  }

  public async findByResponsibleId(
    responsible_id: string,
  ): Promise<Caregiver[]> {
    return this.ormRepository.find({
      where: { responsible_id },
    });
  }

  public async create({
    responsible_id,
    user_name,
    password,
    name,
    phone,
  }: ICreateCaregiverDTO): Promise<Caregiver> {
    const createdCaregiver = this.ormRepository.create({
      responsible_id,
      user_name,
      password,
      name,
      phone,
    });

    const savedCaregiver = await this.ormRepository.save(createdCaregiver);

    return savedCaregiver;
  }

  public async save(caregiver: Caregiver): Promise<Caregiver> {
    return this.ormRepository.save(caregiver);
  }

  public async delete(caregiver: Caregiver): Promise<Caregiver> {
    return this.ormRepository.remove(caregiver);
  }
}
