import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {MiroUser} from './MiroUser';
import {Board} from './Board';          // Make sure you import the Board entity
import {Questionnaire} from './Questionnaire';  // Make sure you import the Questionnaire entity

@Entity()
export class Response {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    questionId?: number;

    @Column()
    userId?: number;

    @ManyToOne(() => MiroUser)
    @JoinColumn({name: 'userId'})
    user?: MiroUser;

    @Column()
    teamId?: string;

    @ManyToOne(() => Board)            // Adding relationship with Board
    @JoinColumn({name: 'boardId'})     // You might need to add a new column for boardId
    board?: Board;

    @ManyToOne(() => Questionnaire)    // Adding relationship with Questionnaire
    @JoinColumn({name: 'questionnaireId'})  // You might need to add a new column for questionnaireId
    questionnaire?: Questionnaire;

    @Column("text")
    answer?: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    dateCreated?: Date;
}