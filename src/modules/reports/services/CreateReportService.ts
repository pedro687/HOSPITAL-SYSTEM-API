import { injectable, inject } from 'tsyringe';
import { parseISO, isAfter, startOfMinute, differenceInDays } from 'date-fns';

import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';
import IReportsRepository from '../repositories/IReportsRepository';
import Report from '../infra/typeorm/entities/Report';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  caregiver_id: string;
  patient_id: string;
  description: string;
  date: string;
}

@injectable()
export default class CreateReportService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute({
    caregiver_id,
    patient_id,
    description,
    date,
  }: IRequest): Promise<Report> {
    const caregiverFound = await this.caregiversRepository.findByIdWithEager(
      caregiver_id,
    );

    if (!caregiverFound) {
      throw new AppError('Authenticated caregiver does not exists.');
    }

    const patientFound = caregiverFound.patients.find(
      patient => patient.id === patient_id,
    );

    if (!patientFound) {
      throw new AppError('Patient does not exists on caregiver relation');
    }

    const parsedDate = startOfMinute(parseISO(date));

    if (isAfter(parsedDate, Date.now())) {
      throw new AppError("You can't create a report on a future date");
    }

    if (differenceInDays(Date.now(), parsedDate) > 1) {
      throw new AppError(
        "You can't create a report about something that happened two or more days ago.",
      );
    }

    const report = await this.reportsRepository.create({
      caregiver_id,
      patient_id,
      description,
      date: parsedDate,
    });

    return report;
  }
}
