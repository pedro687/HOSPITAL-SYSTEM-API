import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../repositories/ICaregiversRepository';
import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';

import Caregiver from '../infra/typeorm/entities/Caregiver';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  caregiver: Caregiver;
  token: string;
}

@injectable()
export default class AuthenticateCaregiverService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const caregiverFound = await this.caregiversRepository.findByUsername(
      username,
    );

    if (!caregiverFound) {
      throw new AppError('Invalid username/password combination.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      caregiverFound.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid username/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ name: caregiverFound.name }, secret, {
      subject: caregiverFound.id,
      expiresIn,
    });

    return { caregiver: caregiverFound, token };
  }
}
