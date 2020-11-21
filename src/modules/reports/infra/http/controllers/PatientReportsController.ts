import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowAllFromPatientIdService from '../../../services/ShowAllFromPatientIdService';

export default class PatientReportsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { patient_id } = request.params;

    const showAllFromPatient = container.resolve(ShowAllFromPatientIdService);

    const reports = await showAllFromPatient.execute({
      user_id,
      patient_id,
    });

    return response.json(reports);
  }
}
