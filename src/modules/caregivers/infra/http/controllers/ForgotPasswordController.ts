import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      username,
    });

    return response.status(204).json();
  }
}
