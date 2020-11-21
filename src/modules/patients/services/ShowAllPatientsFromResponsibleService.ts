import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IPatientsRepository from '../repositories/IPatientsRepository';
import IResponsibleRepository from '../../responsibles/repositories/IResponsiblesRepository';

import Patient from '../infra/typeorm/entities/Patient';

interface IRequest {
  responsible_id: string;
}

@injectable()
export default class ShowAllPatientsFromResponsibleService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsibleRepository,
  ) {}

  public async execute({ responsible_id }: IRequest): Promise<Patient[]> {
    const checkResponsibleExists = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!checkResponsibleExists) {
      throw new AppError('Responsible authenticated does not exists');
    }

    const patients = await this.patientsRepository.findByResponsibleId(
      responsible_id,
    );

    return patients;
  }
}
