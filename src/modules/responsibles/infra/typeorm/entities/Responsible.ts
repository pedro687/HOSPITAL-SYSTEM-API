import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Patient from '../../../../patients/infra/typeorm/entities/Patient';
import Caregiver from '../../../../caregivers/infra/typeorm/entities/Caregiver';
import DoctorAppointment from '../../../../doctor_appointments/infra/typeorm/entities/DoctorAppointment';

@Entity('responsibles')
export default class Responsible {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column('boolean', {
    default: false,
  })
  pro: boolean;

  @Column('uuid', { nullable: true })
  patient_id: string;

  @OneToMany(() => Patient, patient => patient.responsible)
  @JoinColumn({ name: 'patient_id' })
  patients: Patient[];

  @Column('uuid', { nullable: true })
  caregiver_id: string;

  @ManyToMany(() => Caregiver, caregiver => caregiver.responsibles)
  @JoinColumn({ name: 'caregiver_id' })
  @JoinTable()
  caregivers: Caregiver[];

  @OneToMany(
    () => DoctorAppointment,
    doctorAppointment => doctorAppointment.responsible,
  )
  doctor_appointments: DoctorAppointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
