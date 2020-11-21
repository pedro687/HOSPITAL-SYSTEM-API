import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IReportsRepository from '../repositories/IReportsRepository';

import Report from '../infra/typeorm/entities/Report';

interface IRequest {
  caregiver_id: string;
}

@injectable()
export default class ShowAllFromCaregiverIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute({ caregiver_id }: IRequest): Promise<Report[]> {
    const caregiverFound = await this.caregiversRepository.findById(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Authenticated caregiver does not exists');
    }

    const reports = await this.reportsRepository.findByCaregiverId(
      caregiver_id,
    );

    return reports;
  }
}
