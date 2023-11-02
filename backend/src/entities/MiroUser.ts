import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinTable, ManyToMany} from 'typeorm';
import {Team} from "./Team";
import {Board} from "./Board";

@Entity()
export class MiroUser {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    miroUserId?: string; // ID from Miro

    @Column()
    name?: string; // Name from Miro

    @ManyToOne(() => Team, team => team.users)
    team?: Team;

    @ManyToMany(() => Board)
    @JoinTable()
    boards?: Board[];
}