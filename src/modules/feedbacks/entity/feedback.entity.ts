import { Appointment } from "./../../appointments/entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('feedbacks')
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    branch_rating: number

    @Column()
    branch_feedback: string

    @Column()
    employee_rating: number

    @Column()
    employee_feedback: string

    @Column()
    overall_rating: number

    @Column()
    appointment_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToOne(() => Appointment, appointment => appointment.feedback)
    appointment: Appointment
}