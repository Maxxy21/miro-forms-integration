import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {Team} from "./Team";
import {Board} from "./Board";

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

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

    @OneToOne(() => Board, board => board.questionnaire)
    board?: Board;
}
