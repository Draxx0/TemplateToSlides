import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('template')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  templateName: string;

  @Column({ type: 'varchar' })
  templateCode: string;
}
