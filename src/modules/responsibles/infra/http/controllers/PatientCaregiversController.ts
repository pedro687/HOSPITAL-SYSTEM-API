import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddPatientToCaregiverService from '../../../services/AddPatientToCaregiverService';

export default class PatientCaregiversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { patient_id, caregiver_id } = request.body;

    const addPatientToCaregiver = container.resolve(
      AddPatientToCaregiverService,
    );
    await addPatientToCaregiver.execute({
      responsible_id,
      caregiver_id,
      patient_id,
    });

    return response.status(204).send();
  }
}
