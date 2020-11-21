import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';

import Responsible from '../infra/typeorm/entities/Responsible';

interface IRequest {
  responsible_id: string;
}

@injectable()
export default class TurnResponsibleProService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,
  ) {}

  public async execute({ responsible_id }: IRequest): Promise<Responsible> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible not found');
    }

    const updatedReponsible = {
      ...responsibleFound,
      pro: true,
    };

    return this.responsiblesRepository.save(updatedReponsible);
  }
}
