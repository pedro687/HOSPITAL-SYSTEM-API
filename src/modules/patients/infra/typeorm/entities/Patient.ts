import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import Responsible from '../../../../responsibles/infra/typeorm/entities/Responsible';
import Caregiver from '../../../../caregivers/infra/typeorm/entities/Caregiver';
import MedicineAppointment from '../../../../medicines_appointment/infra/typeorm/entities/MedicineAppointment';
import DoctorAppointment from '../../../../doctor_appointments/infra/typeorm/entities/DoctorAppointment';

@Entity('patients')
export default class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  responsible_id: string;

  @ManyToOne(() => Responsible)
  @JoinColumn({ name: 'responsible_id' })
  responsible: Responsible;

  @Column('uuid', { nullable: true })
  caregiver_id: string;

  @ManyToMany(() => Caregiver, caregiver => caregiver.patients)
  @JoinColumn({ name: 'caregiver_id' })
  caregivers: Caregiver[];

  @Column('uuid', { nullable: true })
  medicine_appointment_id: string;

  @OneToMany(
    () => MedicineAppointment,
    medicineAppointment => medicineAppointment.patient,
  )
  @JoinColumn({ name: 'medicine_appointment_id' })
  medicine_appointment: MedicineAppointment[];

  @OneToMany(
    () => DoctorAppointment,
    doctorAppointment => doctorAppointment.patient,
  )
  doctor_appointments: DoctorAppointment[];

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  patology: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
