import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllByPatientIdService from '../../../services/ShowAllByPatientIdService';
import ShowOneByPatientIdService from '../../../services/ShowOneByPatientIdService';
import ApplyDoseService from '../../../services/ApplyDoseService';

export default class PatientMedicineAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { patient_id } = request.params;

    const showAllByPatientId = container.resolve(ShowAllByPatientIdService);

    const medicinesAppointments = await showAllByPatientId.execute({
      user_id,
      patient_id,
    });

    return response.json(medicinesAppointments);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { medicine_appointment_id, patient_id } = request.params;

    const showOneByPatientId = container.resolve(ShowOneByPatientIdService);

    const medicineAppointment = await showOneByPatientId.execute({
      user_id,
      patient_id,
      medicine_appointment_id,
    });

    return response.json(medicineAppointment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { medicine_appointment_id, patient_id } = request.params;

    const applyDoseService = container.resolve(ApplyDoseService);

    const updatedMedicineAppointment = await applyDoseService.execute({
      user_id,
      patient_id,
      medicine_appointment_id,
    });

    return response.json(updatedMedicineAppointment);
  }
}
