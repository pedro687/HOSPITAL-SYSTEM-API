import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';
import IResponsibleTokensRepository from '../repositories/IResponsibleTokensRepository';
import IHashProvider from '../../../shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('ResponsibleTokensRepository')
    private responsibleTokensRepository: IResponsibleTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const responsibleToken = await this.responsibleTokensRepository.findByToken(
      token,
    );

    if (!responsibleToken) {
      throw new AppError('Responsible token does not exists');
    }

    const tokenCreatedAt = responsibleToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired');
    }

    const responsible = await this.responsiblesRepository.findById(
      responsibleToken.responsible_id,
    );

    if (!responsible) {
      throw new AppError('Responsible does not exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const updatedResponsible = {
      ...responsible,
      password: hashedPassword,
    };

    await this.responsiblesRepository.save(updatedResponsible);
  }
}
