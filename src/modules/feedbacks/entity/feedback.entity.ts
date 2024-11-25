import { Appointment } from "./../../appointments/entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('feedbacks')
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    branch_rating: number

    @Column({ nullable: true })
    branch_feedback: string

    @Column()
    employee_rating: number

    @Column({ nullable: true })
    employee_feedback: string

    @Column()
    overall_rating: number

    @Column({ nullable: true })
    suggestion: string

    @Column()
    appointment_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToOne(() => Appointment, appointment => appointment.feedback)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment
}