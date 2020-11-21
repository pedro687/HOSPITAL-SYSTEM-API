import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../repositories/ICaregiversRepository';

interface IRequest {
  responsible_id: string;
  caregiver_id: string;
}

interface IResponse {
  message: string;
  caregiver_name: string;
}

@injectable()
export default class DeleteCaregiverService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,
  ) {}

  public async execute({
    responsible_id,
    caregiver_id,
  }: IRequest): Promise<IResponse> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible authenticated does not exists');
    }

    const caregiverFound = await this.caregiversRepository.findById(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Caregiver not found');
    }

    if (caregiverFound.responsible_id !== responsibleFound.id) {
      throw new AppError('Caregiver does not exists on responsible relation');
    }

    const deletedCaregiver = await this.caregiversRepository.delete(
      caregiverFound,
    );

    return {
      message: 'Caregiver successfully deleted',
      caregiver_name: deletedCaregiver.name,
    } as IResponse;
  }
}
