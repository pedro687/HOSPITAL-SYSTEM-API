import ResponsibleToken from '../infra/typeorm/entities/ResponsibleToken';

export default interface IResponsibleTokensRepository {
  generate(responsible_id: string): Promise<ResponsibleToken>;
  findByToken(token: string): Promise<ResponsibleToken | undefined>;
}
