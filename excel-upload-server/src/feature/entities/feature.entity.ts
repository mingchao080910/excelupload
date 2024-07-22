import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @PrimaryColumn()
  Feature: string;
}
