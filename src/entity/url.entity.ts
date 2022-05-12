import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

@Entity('urls')
@Unique('URL_SHORTNER_UQ_NAMES', ['url', 'shortcode'])
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    url: string;

    @Column({ nullable: false, type: 'varchar', length: 10 })
    shortcode: string;

    @Column({ nullable: false, type: 'integer', default: 0 })
    click: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleted: Date;
}
