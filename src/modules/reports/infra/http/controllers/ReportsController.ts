import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReportService from '../../../services/CreateReportService';
import ShowByIdService from '../../../services/ShowByIdService';

export default class ReportsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { report_id } = request.params;

    const showById = container.resolve(ShowByIdService);

    const report = await showById.execute({
      user_id,
      report_id,
    });

    return response.json(report);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const caregiver_id = request.user.id;
    const { patient_id, description, date } = request.body;

    const createReport = container.resolve(CreateReportService);

    const report = await createReport.execute({
      caregiver_id,
      patient_id,
      description,
      date,
    });

    return response.status(201).json(report);
  }
}
