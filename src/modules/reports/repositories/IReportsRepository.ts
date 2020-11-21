import Report from '../infra/typeorm/entities/Report';
import ICreateReportDTO from '../dtos/ICreateReportDTO';

export default interface IReportsRepository {
  findById(id: string): Promise<Report | undefined>;
  findByCaregiverId(caregiver_id: string): Promise<Report[]>;
  findByPatientId(patient_id: string): Promise<Report[]>;
  create({
    caregiver_id,
    patient_id,
    description,
    date,
  }: ICreateReportDTO): Promise<Report>;
  save(report: Report): Promise<Report>;
  delete(report: Report): Promise<void>;
}
