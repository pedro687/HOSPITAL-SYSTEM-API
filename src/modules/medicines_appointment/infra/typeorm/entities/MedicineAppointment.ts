import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Patient from '../../../../patients/infra/typeorm/entities/Patient';
// import Medicine from '../../../../medicines/infra/typeorm/entities/Medicine';

@Entity('medicines_appointment')
export default class MedicineAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  responsible_id: string;

  @Column('uuid')
  patient_id: string;

  @ManyToOne(() => Patient, patient => patient.medicine_appointment)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  medicine_name: string;

  // @Column('uuid')
  // medicine_id: string;

  // @ManyToOne(() => Medicine)
  // @JoinColumn({ name: 'medicine_id' })
  // medicine: Medicine;

  @Column()
  dose: string;

  @Column('integer')
  frequency: number;

  @Column('timestamp without time zone')
  next_dose: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
