import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMedicineAppointmentService from '../../../services/CreateMedicineAppointmentService';
import UpdateMedicineAppointmentService from '../../../services/UpdateMedicineAppointmentService';
import DeleteMedicineAppointmentService from '../../../services/DeleteMedicineAppointmentService';

export default class MedicineAppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const {
      patient_id,
      medicine_name,
      dose,
      frequency,
      next_dose,
    } = request.body;

    const createMedicineAppointment = container.resolve(
      CreateMedicineAppointmentService,
    );

    const medicineAppointment = await createMedicineAppointment.execute({
      responsible_id,
      patient_id,
      medicine_name,
      dose,
      frequency,
      next_dose,
    });

    return response.status(201).json(medicineAppointment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { medicine_appointment_id } = request.params;
    const {
      patient_id,
      medicine_name,
      dose,
      frequency,
      next_dose,
    } = request.body;

    const updateMedicineAppointment = container.resolve(
      UpdateMedicineAppointmentService,
    );

    const medicineAppointment = await updateMedicineAppointment.execute({
      medicine_appointment_id,
      responsible_id,
      patient_id,
      medicine_name,
      dose,
      frequency,
      next_dose,
    });

    return response.json(medicineAppointment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { medicine_appointment_id } = request.params;

    const deleteMedicineAppointment = container.resolve(
      DeleteMedicineAppointmentService,
    );

    await deleteMedicineAppointment.execute({
      responsible_id,
      medicine_appointment_id,
    });

    return response.status(204).send();
  }
}
