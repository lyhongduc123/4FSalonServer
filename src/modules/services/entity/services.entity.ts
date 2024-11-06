import { Appointment } from "src/modules/appointments/entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    estimate_time: number;

    @Column()
    price: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments: Appointment[]

    // @ManyToMany(() => Appointment, (appointment) => appointment.services)
    // appointments: Appointment[]
}