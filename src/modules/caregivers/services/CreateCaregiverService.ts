import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../repositories/ICaregiversRepository';
import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';

import Caregiver from '../infra/typeorm/entities/Caregiver';

interface IRequest {
  responsible_id: string;
  user_name: string;
  password: string;
  name: string;
  phone: string;
}

@injectable()
export default class CreateCaregiverService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,
  ) {}

  public async execute({
    responsible_id,
    user_name,
    password,
    name,
    phone,
  }: IRequest): Promise<Caregiver> {
    const checkResponsibleExists = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!checkResponsibleExists) {
      throw new AppError('Responsible authenticated does not exists');
    }

    if (!checkResponsibleExists.pro) {
      throw new AppError('Responsible needs to be Pro.');
    }

    const howManyCaregivers = checkResponsibleExists.caregivers.length;

    if (howManyCaregivers === 5) {
      throw new AppError('Maximum caregivers amount reached');
    }

    const caregiverWithSameUsername = await this.caregiversRepository.findByUsername(
      user_name,
    );

    if (caregiverWithSameUsername) {
      throw new AppError('Username to caregiver already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const caregiver = await this.caregiversRepository.create({
      responsible_id,
      user_name,
      password: hashedPassword,
      name,
      phone,
    });

    checkResponsibleExists.caregivers = [
      ...checkResponsibleExists.caregivers,
      caregiver,
    ];

    await this.responsiblesRepository.save(checkResponsibleExists);

    return caregiver;
  }
}
