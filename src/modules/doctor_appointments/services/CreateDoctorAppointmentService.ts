import { injectable, inject } from 'tsyringe';
import { isBefore, parseISO, startOfMinute } from 'date-fns';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';
import IDoctorAppointmentsRepository from '../repositories/IDoctorAppointmentsRepository';

import DoctorAppointment from '../infra/typeorm/entities/DoctorAppointment';

interface IRequest {
  responsible_id: string;
  patient_id: string;
  doctor_name: string;
  doctor_phone: string;
  doctor_specialty: string;
  date: string;
}

@injectable()
export default class CreateDoctorAppointmentService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('DoctorAppointmentsRepository')
    private doctorAppointmentsRepository: IDoctorAppointmentsRepository,
  ) {}

  public async execute({
    responsible_id,
    patient_id,
    doctor_name,
    doctor_phone,
    doctor_specialty,
    date,
  }: IRequest): Promise<DoctorAppointment> {
    const parsedDate = startOfMinute(parseISO(date));

    const responsibleFound = await this.responsiblesRepository.findById(
      responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Authenticated responsible does not exists');
    }

    const patientFound = await this.patientsRepository.findById(patient_id);

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    if (responsibleFound.id !== patientFound.responsible_id) {
      throw new AppError('Patient does not exists on responsible relation');
    }

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    const createdDoctorAppointment = await this.doctorAppointmentsRepository.create(
      {
        responsible_id,
        patient_id,
        doctor_name,
        doctor_phone,
        doctor_specialty,
        date: parsedDate,
      },
    );

    return createdDoctorAppointment;
  }
}
