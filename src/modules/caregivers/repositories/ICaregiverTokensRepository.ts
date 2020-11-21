import CaregiverToken from '../infra/typeorm/entities/CaregiverToken';

export default interface ICaregiverTokensRepository {
  generate(caregiver_id: string): Promise<CaregiverToken>;
  findByToken(token: string): Promise<CaregiverToken | undefined>;
}
