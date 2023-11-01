import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Team} from "./Team";

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Team, team => team.questionnaires)
    team?: Team;

    @Column('text')
    founderName?: string;

    @Column('text')
    startupName?: string;

    @Column('text')
    fundingStage?: string;

    @Column('text')
    productType?: string;

    @Column('text')
    feedback?: string;

    @Column('text')
    problems?: string;

    @Column('text')
    solutions?: string;
}
