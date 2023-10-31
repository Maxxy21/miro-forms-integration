import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Response {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    questionId?: number;

    @Column()
    userId?: number;

    @Column()
    teamId?: string;

    @Column("text")
    answer?: string;
}
