import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import DoctorAppointment from '../infra/typeorm/entities/DoctorAppointment';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IDoctorAppointmentsRepository from '../repositories/IDoctorAppointmentsRepository';

interface IRequest {
  responsible_id: string;
}

@injectable()
export default class ShowAllFromResponsibleIdService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('DoctorAppointmentsRepository')
    private doctorAppointmentsRepository: IDoctorAppointmentsRepository,
  ) {}

  public async execute({
    responsible_id,
  }: IRequest): Promise<DoctorAppointment[]> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists');
    }

    const doctorAppointments = await this.doctorAppointmentsRepository.findAllByResponsibleId(
      responsible_id,
    );

    return doctorAppointments;
  }
}
