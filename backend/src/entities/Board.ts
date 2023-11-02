import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn} from "typeorm";
import {Team} from "./Team";
import {MiroUser} from "./MiroUser";
import {Questionnaire} from "./Questionnaire";


@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    localId?: string;

    @Column()
    miroBoardId?: string; // ID from Miro

    @Column({type: 'timestamp'})
    createdAt?: Date;

    @Column({type: 'timestamp'})
    updatedAt?: Date;

    @Column()
    locale?: string;

    @ManyToOne(() => Team, team => team.boards)
    team?: Team;

    @ManyToMany(() => MiroUser)
    users?: MiroUser[];

    @OneToOne(() => Board, board => board.questionnaire)
    board?: Board;

    @OneToOne(() => Questionnaire, questionnaire => questionnaire.board)
    @JoinColumn()
    questionnaire?: Questionnaire;

}
