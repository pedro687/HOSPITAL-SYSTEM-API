import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Responsible from '../../../../responsibles/infra/typeorm/entities/Responsible';
import Patient from '../../../../patients/infra/typeorm/entities/Patient';

@Entity('caregivers')
export default class Caregiver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  responsible_id: string;

  @ManyToMany(() => Responsible, responsible => responsible.caregivers)
  @JoinColumn({ name: 'responsible_id' })
  responsibles: Responsible[];

  @Column('uuid', { nullable: true })
  patient_id: string;

  @ManyToMany(() => Patient, patient => patient.caregivers)
  @JoinColumn({ name: 'patient_id' })
  @JoinTable()
  patients: Patient[];

  @Column()
  user_name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
