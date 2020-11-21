import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SolveReportService from '../../../services/SolveReportService';

export default class SolveReportsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const caregiver_id = request.user.id;
    const { report_id } = request.params;
    const { solved } = request.body;

    const solveReport = container.resolve(SolveReportService);

    const report = await solveReport.execute({
      caregiver_id,
      report_id,
      solved,
    });

    return response.json(report);
  }
}
