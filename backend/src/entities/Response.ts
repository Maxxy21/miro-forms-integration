import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './User'; // Hypothetical User entity

@Entity()
export class Response {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    questionId?: number;

    @Column()
    userId?: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user?: User;

    @Column()
    teamId?: string;

    @Column("text")
    answer?: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    dateCreated?: Date;
}
