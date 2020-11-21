import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Responsible from '../../../../responsibles/infra/typeorm/entities/Responsible';
import Patient from '../../../../patients/infra/typeorm/entities/Patient';

@Entity('doctor_appointments')
export default class DoctorAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  responsible_id: string;

  @ManyToOne(() => Responsible, responsible => responsible.doctor_appointments)
  @JoinColumn({ name: 'responsible_id' })
  responsible: Responsible;

  @Column('uuid')
  patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  doctor_name: string;

  @Column()
  doctor_phone: string;

  @Column()
  doctor_specialty: string;

  @Column('timestamp without time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
