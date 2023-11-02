// Team (or Startup) Schema
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MiroUser} from "./MiroUser";
import {Questionnaire} from "./Questionnaire";
import {Board} from "./Board";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    // Possibly other attributes related to the team, like a unique team code, etc.

    @OneToMany(() => MiroUser, user => user.team)
    users?: MiroUser[];

    @OneToMany(() => Questionnaire, questionnaire => questionnaire.team)
    questionnaires?: Questionnaire[];

    @OneToMany(() => Board, board => board.team)
    boards?: Board[];

}