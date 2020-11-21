import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowAllCaregiversFromResponsibleIdService from '../../../services/ShowAllCaregiversFromResponsibleIdService';
import ShowCaregiverByIdService from '../../../services/ShowCaregiverByIdService';
import DeleteCaregiverService from '../../../services/DeleteCaregiverService';

export default class ResponsibleCaregiversController {
  public async index(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;

    const showAllCaregiversFromResponsibleId = container.resolve(
      ShowAllCaregiversFromResponsibleIdService,
    );

    const caregivers = await showAllCaregiversFromResponsibleId.execute({
      responsible_id,
    });

    return response.json(classToClass(caregivers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { caregiverId } = request.params;

    const showCaregiverById = container.resolve(ShowCaregiverByIdService);

    const caregiver = await showCaregiverById.execute({
      responsible_id,
      caregiver_id: caregiverId,
    });

    return response.json(classToClass(caregiver));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const responsible_id = request.user.id;
    const { caregiverId } = request.params;

    const deleteCaregiver = container.resolve(DeleteCaregiverService);

    const caregiverDeletedData = await deleteCaregiver.execute({
      responsible_id,
      caregiver_id: caregiverId,
    });

    return response.json(caregiverDeletedData);
  }
}
