import { Repository, getRepository } from 'typeorm';

import IReportsRepository from '../../../repositories/IReportsRepository';

import Report from '../entities/Report';
import ICreateReportDTO from '../../../dtos/ICreateReportDTO';

export default class ReportsRepository implements IReportsRepository {
  private ormRepository: Repository<Report>;

  constructor() {
    this.ormRepository = getRepository(Report);
  }

  public async findById(id: string): Promise<Report | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByPatientId(patient_id: string): Promise<Report[]> {
    return this.ormRepository.find({
      where: {
        patient_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findByCaregiverId(caregiver_id: string): Promise<Report[]> {
    return this.ormRepository.find({
      where: {
        caregiver_id,
      },
    });
  }

  public async create({
    caregiver_id,
    patient_id,
    description,
    date,
  }: ICreateReportDTO): Promise<Report> {
    const report = this.ormRepository.create({
      caregiver_id,
      patient_id,
      description,
      date,
    });

    return this.ormRepository.save(report);
  }

  public async save(report: Report): Promise<Report> {
    return this.ormRepository.save(report);
  }

  public async delete(report: Report): Promise<void> {
    await this.ormRepository.remove(report);
  }
}
