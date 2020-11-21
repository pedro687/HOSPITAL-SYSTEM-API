import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IReportsRepository from '../repositories/IReportsRepository';

import Report from '../infra/typeorm/entities/Report';

interface IRequest {
  user_id: string;
  report_id: string;
}

@injectable()
export default class ShowByIdService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute({ user_id, report_id }: IRequest): Promise<Report> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findByIdWithEager(
      user_id,
    );

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated user does not exists');
    }

    const report = await this.reportsRepository.findById(report_id);

    if (!report) {
      throw new AppError('Report not found.');
    }

    if (isResponsible) {
      const caregiverFound = await this.caregiversRepository.findById(
        report.caregiver_id,
      );

      if (!caregiverFound) {
        throw new AppError('Caregiver does not exists on responsible relation');
      }

      if (caregiverFound.responsible_id !== user_id) {
        throw new AppError('Report does not belongs to this user');
      }
    } else if (isCaregiver) {
      const careOfSamePatient = !!isCaregiver.patients.find(
        patient => patient.id === report.patient_id,
      );

      if (!careOfSamePatient) {
        throw new AppError(
          'Caregiver does not have any relation with patient of report',
        );
      }
    }

    return report;
  }
}
