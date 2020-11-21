import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '../../../shared/errors/AppError';

import ICaregiversRepository from '../repositories/ICaregiversRepository';
import ICaregiverTokensRepository from '../repositories/ICaregiverTokensRepository';
import IResponsiblesRepository from '../../responsibles/repositories/IResponsiblesRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  username: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('CaregiversRepository')
    private caregiversRepository: ICaregiversRepository,

    @inject('CaregiverTokensRepository')
    private caregiverTokensRepository: ICaregiverTokensRepository,

    @inject('ResponsiblesRepository')
    private responsiblesRepository: IResponsiblesRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ username }: IRequest): Promise<void> {
    const caregiverFound = await this.caregiversRepository.findByUsername(
      username,
    );

    if (!caregiverFound) {
      throw new AppError('Caregiver not found');
    }

    const responsibleFound = await this.responsiblesRepository.findById(
      caregiverFound.responsible_id,
    );

    if (!responsibleFound) {
      throw new AppError('Responsible not found');
    }

    const { token } = await this.caregiverTokensRepository.generate(
      caregiverFound.id,
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
      subject: '[HumanCare] Recuperação de senha de um cuidador',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          responsible_name: responsibleFound.name,
          caregiver_name: caregiverFound.name,
          token,
        },
      },
    });
  }
}
