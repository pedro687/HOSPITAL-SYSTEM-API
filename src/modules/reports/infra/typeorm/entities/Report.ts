import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Caregiver from '../../../../caregivers/infra/typeorm/entities/Caregiver';
import Patient from '../../../../patients/infra/typeorm/entities/Patient';

@Entity('reports')
export default class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  caregiver_id: string;

  @ManyToOne(() => Caregiver)
  @JoinColumn({ name: 'caregiver_id' })
  caregiver: Caregiver;

  @Column('uuid')
  patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column('text')
  description: string;

  @Column('boolean', { nullable: true, default: null })
  solved: boolean;

  @Column('timestamp without time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
