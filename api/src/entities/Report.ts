import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import is from 'utils/validation';
import { Project } from '.';

@Entity()
class Report extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(200)],
    file: is.required(),
    projectId: is.required(),
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column('text', { nullable: false })
  file: string;

  @ManyToOne(
    () => Project,
    project => project.reports,
  )
  project: Project;

  @Column('integer')
  projectId: number;
}

export default Report;
