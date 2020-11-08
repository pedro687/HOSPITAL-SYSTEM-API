import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('patients')
class Patients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  patology: string;

  @Column()
  cep: string;

  @Column()
  uf: string;

  @Column()
  city: string;

}

export default Patients;
