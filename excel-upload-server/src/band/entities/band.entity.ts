import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @PrimaryColumn()
  Band: string;
}
