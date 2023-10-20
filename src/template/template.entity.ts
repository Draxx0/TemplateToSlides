import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SlideSchema } from './types/template';

@Entity('template')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  templateName: string;

  @Column({ type: 'varchar' })
  templateCode: string;

  @Column('jsonb', { array: false, default: () => "'[]'", nullable: true })
  templateSchema: SlideSchema[];
}
