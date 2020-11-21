import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '../../../shared/errors/AppError';

import IResponsiblesRepository from '../repositories/IResponsiblesRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IResponsibleTokensRepository from '../repositories/IResponsibleTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('ResponsibleTokensRepository')
    private responsibleTokensRepository: IResponsibleTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const responsibleFound = await this.responsiblesRepository.findByEmail(
      email,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible does not exists');
    }

    const { token } = await this.responsibleTokensRepository.generate(
      responsibleFound.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: responsibleFound.name,
        email: responsibleFound.email,
      },
      subject: '[HumanCare] Recuperação de senha do responsável',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: responsibleFound.name,
          token,
        },
      },
    });
  }
}
