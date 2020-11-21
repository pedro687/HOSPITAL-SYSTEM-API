import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IDoctorAppointmentsRepository from '../repositories/IDoctorAppointmentsRepository';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';

import DoctorAppointment from '../infra/typeorm/entities/DoctorAppointment';
import Patient from '../../patients/infra/typeorm/entities/Patient';

interface IRequest {
  user_id: string;
  patient_id: string;
}

@injectable()
export default class ShowAllFromPatientIdService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('DoctorAppointmentsRepository')
    private doctorAppointmentsRepository: IDoctorAppointmentsRepository,
  ) {}

  public async execute({
    user_id,
    patient_id,
  }: IRequest): Promise<DoctorAppointment[]> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findById(user_id);

    const findCaregiverRelation = (
      patient: Patient,
      caregiver_id: string,
    ): boolean => {
      return !!patient.caregivers.find(
        caregiver => caregiver.id === caregiver_id,
      );
    };

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated user does not exists');
    }

    const doctorAppointments = await this.doctorAppointmentsRepository.findAllByPatientId(
      patient_id,
    );

    const patientFound = await this.patientsRepository.findByIdWithCaregivers(
      patient_id,
    );

    if (!patientFound) {
      throw new AppError('Patient not found');
    }

    const hasRelation = isResponsible
      ? patientFound.responsible_id === user_id
      : findCaregiverRelation(patientFound, user_id);

    if (!hasRelation) {
      throw new AppError(
        'No doctor appointment relation with this user was found',
      );
    }

    return doctorAppointments;
  }
}
