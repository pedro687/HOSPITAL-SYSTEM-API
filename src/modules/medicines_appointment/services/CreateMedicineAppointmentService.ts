import { injectable, inject } from 'tsyringe';
import { startOfMinute, parseISO } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import IMedicinesAppointmentRepository from '../repositories/IMedicinesAppointmentRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';
// import IMedicinesRepository from '../../medicines/repositories/IMedicinesRepository';

import MedicineAppointment from '../infra/typeorm/entities/MedicineAppointment';

interface IRequest {
  responsible_id: string;
  patient_id: string;
  medicine_name: string;
  dose: string;
  frequency: number;
  next_dose: string;
}

@injectable()
export default class CreateMedicineAppointmentService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    // @inject('MedicinesRepository')
    // private medicinesRepository: IMedicinesRepository,

    @inject('MedicinesAppointmentRepository')
    private medicinesAppointmentRepository: IMedicinesAppointmentRepository,
  ) {}

  public async execute({
    responsible_id,
    patient_id,
    medicine_name,
    dose,
    frequency,
    next_dose,
  }: IRequest): Promise<MedicineAppointment> {
    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated user does not exists');
    }

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    if (patientFound.responsible_id !== responsibleFound.id) {
      throw new AppError(
        'This patient does not exists on responsible relation',
      );
    }

    // const medicineFound = await this.medicinesRepository.findById(medicine_id);

    // if (!medicineFound) {
    //   throw new AppError(
    //     'This medicine does not exists. You need to create it.',
    //   );
    // }

    const parsedNextDose = startOfMinute(parseISO(next_dose));

    const medicineAppointment = await this.medicinesAppointmentRepository.create(
      {
        responsible_id,
        patient_id,
        medicine_name,
        dose,
        frequency,
        next_dose: parsedNextDose,
      },
    );

    return medicineAppointment;
  }
}
