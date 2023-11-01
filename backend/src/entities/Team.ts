// Team (or Startup) Schema
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Questionnaire} from "./Questionnaire";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    // Possibly other attributes related to the team, like a unique team code, etc.

    @OneToMany(() => User, user => user.team)
    users?: User[];

    @OneToMany(() => Questionnaire, questionnaire => questionnaire.team)
    questionnaires?: Questionnaire[];
}