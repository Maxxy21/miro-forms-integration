import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    text?: string;

    @Column()
    teamId?: string;
}
