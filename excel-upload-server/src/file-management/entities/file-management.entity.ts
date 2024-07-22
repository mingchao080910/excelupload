import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class FileManagement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  MeasurementItems: string;
  @Column()
  Time: string;
  @Column()
  Phone: string;
  @Column()
  Band: string;
  @Column()
  FeatureName: string;
  @Column()
  FeatureSwitch: boolean;
  @Column('text')
  Links: string;
  @Column('text')
  UploadedLinks: string;
}
