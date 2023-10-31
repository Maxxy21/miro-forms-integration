import {Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id?: string;

    @Column({nullable: true})
    teamId?: string;

    @Column({nullable: true})
    teamName?: string;


    // ... other fields ...
}
