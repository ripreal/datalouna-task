import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @OneToMany(() => Purchase, purchase => purchase.user)
  purchases: Purchase[];
}