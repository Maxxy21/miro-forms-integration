import {Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Team} from "./Team";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Team, team => team.users)
    team?: Team;
}