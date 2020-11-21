import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowAllFromCaregiverIdService from '../../../services/ShowAllFromCaregiverIdService';

export default class CaregiverReportsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const caregiver_id = request.user.id;

    const showAllFromCaregiver = container.resolve(
      ShowAllFromCaregiverIdService,
    );

    const reports = await showAllFromCaregiver.execute({
      caregiver_id,
    });

    return response.json(reports);
  }
}
