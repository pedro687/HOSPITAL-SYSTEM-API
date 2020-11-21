import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowAllPatientsFromResponsibleService from '../../../services/ShowAllPatientsFromResponsibleService';
import ShowPatientByIdService from '../../../services/ShowPatientByIdService';
import DeletePatientService from '../../../services/DeletePatientService';

export default class ResponsiblePatientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;

    const showAllPatientsFromResponsible = container.resolve(
      ShowAllPatientsFromResponsibleService,
    );

    const patients = await showAllPatientsFromResponsible.execute({
      responsible_id,
    });

    return response.json(classToClass(patients));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { patientId } = request.params;

    const showPatientById = container.resolve(ShowPatientByIdService);

    const patient = await showPatientById.execute({
      responsible_id,
      patient_id: patientId,
    });

    return response.json(classToClass(patient));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { patientId } = request.params;

    const deletePatient = container.resolve(DeletePatientService);

    const patientDeletedData = await deletePatient.execute({
      responsible_id,
      patient_id: patientId,
    });

    return response.json(patientDeletedData);
  }
}
