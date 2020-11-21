import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDoctorAppointmentService from '../../../services/CreateDoctorAppointmentService';
import ShowOneByIdService from '../../../services/ShowOneByIdService';

export default class DoctorAppointmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { doctor_appointment_id } = request.params;

    const showOneById = container.resolve(ShowOneByIdService);

    const doctorAppointment = await showOneById.execute({
      user_id,
      doctor_appointment_id,
    });

    return response.json(doctorAppointment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const {
      patient_id,
      doctor_name,
      doctor_phone,
      doctor_specialty,
      date,
    } = request.body;

    const createDoctorAppointment = container.resolve(
      CreateDoctorAppointmentService,
    );

    const createdDoctorAppointment = await createDoctorAppointment.execute({
      responsible_id,
      patient_id,
      doctor_name,
      doctor_phone,
      doctor_specialty,
      date,
    });

    return response.status(201).json(createdDoctorAppointment);
  }
}
