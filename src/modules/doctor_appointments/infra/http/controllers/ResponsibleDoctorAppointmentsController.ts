import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllFromResponsibleIdService from '../../../services/ShowAllFromResponsibleIdService';

export default class ResponsibleDoctorAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;

    const showAllFromResponsibleId = container.resolve(
      ShowAllFromResponsibleIdService,
    );

    const doctorAppointments = await showAllFromResponsibleId.execute({
      responsible_id,
    });

    return response.json(doctorAppointments);
  }
}
