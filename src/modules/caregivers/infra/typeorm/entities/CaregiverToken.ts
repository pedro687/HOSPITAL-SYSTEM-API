import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Caregiver from './Caregiver';

@Entity('caregiver_tokens')
export default class CaregiverToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  caregiver_id: string;

  @ManyToOne(() => Caregiver, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'caregiver_id' })
  caregiver: Caregiver;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
