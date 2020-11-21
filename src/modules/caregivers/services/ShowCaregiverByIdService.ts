import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../repositories/ICaregiversRepository';

import Caregiver from '../infra/typeorm/entities/Caregiver';

interface IRequest {
  caregiver_id: string;
  responsible_id: string;
}

@injectable()
export default class ShowPatientByIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,
  ) {}

  public async execute({
    caregiver_id,
    responsible_id,
  }: IRequest): Promise<Caregiver> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists.');
    }

    const caregiverFound = await this.caregiversRepository.findById(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('No caregiver found.');
    }

    if (caregiverFound.responsible_id !== responsibleFound.id) {
      throw new AppError(
        'This caregiver does not exist on responsible relation.',
      );
    }

    return caregiverFound;
  }
}
