import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonDto } from "../person.dto";
import { PersonEntity } from "../person.entity";


@Entity('employee')
export class employeeEntity extends PersonDto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string

    @OneToOne(() => PersonEntity, (person) => person.employee)
    @JoinColumn({name: 'personid'})
    person: PersonEntity


}