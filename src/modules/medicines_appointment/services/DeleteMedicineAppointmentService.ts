import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IMedicinesAppointmentRepository from '../repositories/IMedicinesAppointmentRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';

interface IRequest {
  responsible_id: string;
  medicine_appointment_id: string;
}

@injectable()
export default class DeleteMedicineAppointmentService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('MedicinesAppointmentRepository')
    private medicinesAppointmentRepository: IMedicinesAppointmentRepository,
  ) {}

  public async execute({
    responsible_id,
    medicine_appointment_id,
  }: IRequest): Promise<void> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists');
    }

    const medicineAppointmentFound = await this.medicinesAppointmentRepository.findById(
      medicine_appointment_id,
    );

    if (!medicineAppointmentFound) {
      throw new AppError('Medicine appointment not found.');
    }

    if (medicineAppointmentFound.responsible_id !== responsibleFound.id) {
      throw new AppError(
        'Medicine appointment does not belongs to the responsible.',
      );
    }

    return this.medicinesAppointmentRepository.delete(medicineAppointmentFound);
  }
}
