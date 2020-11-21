import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';
import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';

import Responsible from '../infra/typeorm/entities/Responsible';

interface IRequest {
  name: string;
  user_name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

@injectable()
export default class CreateResponsibleService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    user_name,
    email,
    password,
    cpf,
    phone,
  }: IRequest): Promise<Responsible> {
    const checkUserExistsByEmail = await this.responsiblesRepository.findByEmail(
      email,
    );

    if (checkUserExistsByEmail) {
      throw new AppError('This e-mail is already used');
    }

    const checkUserExistsByUsername = await this.responsiblesRepository.findByUsername(
      user_name,
    );

    if (checkUserExistsByUsername) {
      throw new AppError('This username is already used');
    }

    const checkUserExistsByCpf = await this.responsiblesRepository.findByCpf(
      cpf,
    );

    if (checkUserExistsByCpf) {
      throw new AppError('This cpf is already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.responsiblesRepository.create({
      name,
      user_name,
      email,
      password: hashedPassword,
      cpf,
      phone,
    });

    return user;
  }
}
