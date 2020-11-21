import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';
import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';

import Responsible from '../infra/typeorm/entities/Responsible';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  responsible: Responsible;
  token: string;
}

@injectable()
export default class AuthenticateResponsibleService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const userFound = await this.responsiblesRepository.findByUsername(
      username,
    );

    if (!userFound) {
      throw new AppError('Invalid username/password combination.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userFound.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid username/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ name: userFound.name }, secret, {
      subject: userFound.id,
      expiresIn,
    });

    return { responsible: userFound, token };
  }
}
