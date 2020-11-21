import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllPatientsFromCaregiverIdService from '../../../services/ShowAllPatientsFromCaregiverIdService';
import ShowOnePatientFromCaregiverIdService from '../../../services/ShowOnePatientFromCaregiverIdService';

export default class PatientsCaregiverController {
  public async index(request: Request, response: Response): Promise<Response> {
    const caregiver_id = request.user.id;

    const showAllPatientsFromCaregiverId = container.resolve(
      ShowAllPatientsFromCaregiverIdService,
    );

    const patients = await showAllPatientsFromCaregiverId.execute({
      caregiver_id,
    });

    return response.json(patients);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const caregiver_id = request.user.id;
    const { patient_id } = request.params;

    const showOnePatientFromCaregiverId = container.resolve(
      ShowOnePatientFromCaregiverIdService,
    );

    const patient = await showOnePatientFromCaregiverId.execute({
      caregiver_id,
      patient_id,
    });

    return response.json(patient);
  }
}
