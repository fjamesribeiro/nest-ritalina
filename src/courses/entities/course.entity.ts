import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tags.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
  tags: Array<Tag>;
}
