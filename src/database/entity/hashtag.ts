import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hashtags' })
export class Hashtags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    tag_name!: string;
}
