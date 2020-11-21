import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowAllFromPatientIdService from '../../../services/ShowAllFromPatientIdService';

export default class PatientDoctorAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { patient_id } = request.params;

    const showAllFromPatientId = container.resolve(ShowAllFromPatientIdService);

    const doctorAppointments = await showAllFromPatientId.execute({
      user_id,
      patient_id,
    });

    return response.json(doctorAppointments);
  }
}
