import { stringify } from 'querystring';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePatientsTable1604760803019
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'patients',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'age',
              type: 'int',
            },
            {
              name: 'patology',
              type: 'varchar',
            },
            {
              name: 'cep',
              type: 'varchar',
            },
            {
              name: 'uf',
              type: 'varchar',
            },
            {
              name: 'city',
              type: 'varchar',
            },
          ]
        }
      )
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients');
  }
}
