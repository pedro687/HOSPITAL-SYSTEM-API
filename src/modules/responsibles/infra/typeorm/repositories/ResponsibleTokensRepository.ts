import { Repository, getRepository } from 'typeorm';

import IResponsibleTokensRepository from '../../../repositories/IResponsibleTokensRepository';

import ResponsibleToken from '../entities/ResponsibleToken';

export default class ResponsibleTokensRepository
  implements IResponsibleTokensRepository {
  private ormRepository: Repository<ResponsibleToken>;

  constructor() {
    this.ormRepository = getRepository(ResponsibleToken);
  }

  public async findByToken(
    token: string,
  ): Promise<ResponsibleToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }

  public async generate(responsible_id: string): Promise<ResponsibleToken> {
    const responsibleToken = this.ormRepository.create({
      responsible_id,
    });

    return this.ormRepository.save(responsibleToken);
  }
}
