import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsibleRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../repositories/ICaregiversRepository';

import Caregiver from '../infra/typeorm/entities/Caregiver';

interface IRequest {
  responsible_id: string;
}

@injectable()
export default class ShowAllCaregiversFromResponsibleIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsibleRepository,
  ) {}

  public async execute({ responsible_id }: IRequest): Promise<Caregiver[]> {
    const checkResponsibleExists = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!checkResponsibleExists) {
      throw new AppError('Responsible authenticated does not exists');
    }

    const caregivers = await this.caregiversRepository.findByResponsibleId(
      responsible_id,
    );

    return caregivers;
  }
}
