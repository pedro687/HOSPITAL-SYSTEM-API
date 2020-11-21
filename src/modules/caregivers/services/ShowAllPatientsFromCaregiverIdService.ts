import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../repositories/ICaregiversRepository';

import Patient from '../../patients/infra/typeorm/entities/Patient';

interface IRequest {
  caregiver_id: string;
}

@injectable()
export default class ShowAllPatientsFromCaregiverIdService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,
  ) {}

  public async execute({ caregiver_id }: IRequest): Promise<Patient[]> {
    const caregiverFound = await this.caregiversRepository.findByIdWithEager(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Authenticated caregiver does not exists');
    }

    return caregiverFound.patients;
  }
}
