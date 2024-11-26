import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "./../../customers/entity";
import { Employee } from "./../../employees/entity";
import { Service } from "./../../services/entity";
import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    ManyToMany, 
    JoinTable, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
    RelationId,
    OneToOne
} from "typeorm";
import { Branch } from "src/modules/branches/entity";
import { Feedback } from "src/modules/feedbacks/entity";
import { Exclude } from "class-transformer";
import { User } from "src/modules/users/entity";

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: Date;

    @Column()
    start_time: Date;

    @Column()
    estimated_end_time: Date;

    @Column()
    final_price: number;

    @Column({
        type: 'enum',
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    })
    status: AppointmentStatus;

    @Column()
    @RelationId((appointment: Appointment) => appointment.user)
    user_id: number;

    @Column()
    employee_id: number;

    @Column()
    branch_id: number;

    @Column({ nullable: false })
    service_id: number;

    @Column({ nullable: true })
    feedback_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Employee, (employee) => employee.appointments, { nullable: false })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => Branch, (branch) => branch.appointments, { nullable: false })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @OneToOne(() => Feedback, (feedback) => feedback.appointment, { nullable: true })
    feedback: Feedback;

    @ManyToOne(() => Service, (service) => service.appointments, { nullable: false })
    @JoinColumn({ name: 'service_id' })
    service: Service;
    
    // @ManyToMany(() => Service, (service) => service.appointments)
    // @JoinTable({
    //     name: 'appointment_services',
    //     joinColumns: [{ name: 'appointment_id' }],
    //     inverseJoinColumns: [{ name: 'service_id' }]
    // })
    // services: Service[]
}