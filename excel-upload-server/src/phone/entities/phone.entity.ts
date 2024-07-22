import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';
@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @PrimaryColumn()
  @Unique('PhoneUnique', ['Phone'])
  Phone: string;
}
