import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IDoctorAppointmentsRepository from '../repositories/IDoctorAppointmentsRepository';
import ICaregiversRepository from '../../caregivers/repositories/ICaregiversRepository';

import DoctorAppointment from '../infra/typeorm/entities/DoctorAppointment';
import IPatientsRepository from '../../patients/repositories/IPatientsRepository';

interface IRequest {
  user_id: string;
  doctor_appointment_id: string;
}

@injectable()
export default class ShowOneByIdService {
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
    doctor_appointment_id,
  }: IRequest): Promise<DoctorAppointment> {
    const isResponsible = await this.responsiblesRepository.findById(user_id);
    const isCaregiver = await this.caregiversRepository.findById(user_id);

    const findCaregiver = async (
      caregiver_id: string,
      patient_id: string,
    ): Promise<boolean> => {
      const patient = await this.patientsRepository.findByIdWithCaregivers(
        patient_id,
      );

      if (!patient) {
        throw new AppError('Patient of doctor appointment not found');
      }

      return !!patient.caregivers.find(
        caregiver => caregiver.id === caregiver_id,
      );
    };

    if (!isResponsible && !isCaregiver) {
      throw new AppError('Authenticated user does not exists');
    }

    const doctorAppointment = await this.doctorAppointmentsRepository.findById(
      doctor_appointment_id,
    );

    if (!doctorAppointment) {
      throw new AppError('Doctor appoinment not found.');
    }

    const hasRelation = isResponsible
      ? doctorAppointment.responsible_id === user_id
      : await findCaregiver(user_id, doctorAppointment.patient_id);

    if (!hasRelation) {
      throw new AppError(
        'No doctor appointment relation with this user was found',
      );
    }

    return doctorAppointment;
  }
}
