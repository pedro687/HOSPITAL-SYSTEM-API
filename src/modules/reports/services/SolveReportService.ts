import { injectable, inject } from 'tsyringe';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IReportsRepository from '../repositories/IReportsRepository';
import Report from '../infra/typeorm/entities/Report';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  caregiver_id: string;
  report_id: string;
  solved: boolean;
}

@injectable()
export default class SolveReportService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute({
    caregiver_id,
    report_id,
    solved,
  }: IRequest): Promise<Report> {
    const caregiverFound = await this.caregiversRepository.findById(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Authenticated caregiver does not exists');
    }

    const reportFound = await this.reportsRepository.findById(report_id);

    if (!reportFound) {
      throw new AppError('Report not found');
    }

    if (reportFound.caregiver_id !== caregiverFound.id) {
      throw new AppError('Report does not belongs to the caregiver');
    }

    reportFound.solved = solved;

    return this.reportsRepository.save(reportFound);
  }
}
