import { Repository, getRepository } from 'typeorm';
import CaregiverToken from '../entities/CaregiverToken';
import ICaregiverTokensRepository from '../../../repositories/ICaregiverTokensRepository';

export default class CaregiverTokensRepository
  implements ICaregiverTokensRepository {
  private ormRepository: Repository<CaregiverToken>;

  constructor() {
    this.ormRepository = getRepository(CaregiverToken);
  }

  public async generate(caregiver_id: string): Promise<CaregiverToken> {
    const caregiverToken = this.ormRepository.create({
      caregiver_id,
    });

    return this.ormRepository.save(caregiverToken);
  }

  public async findByToken(token: string): Promise<CaregiverToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }
}
