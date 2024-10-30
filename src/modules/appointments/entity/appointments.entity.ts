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
    RelationId
} from "typeorm";

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

    @Column({
        type: 'enum',
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Customer, (customer) => customer.appointments, { nullable: false })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Employee, (employee) => employee.appointments, { nullable: false })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @RelationId((appointment: Appointment) => appointment.employee)
    employee_id: number;

    @RelationId((appointment: Appointment) => appointment.customer)
    customer_id: number;

    // @ManyToMany(() => Service, (service) => service.appointments)
    // @JoinTable({
    //     name: 'appointment_services',
    //     joinColumns: [{ name: 'appointment_id' }],
    //     inverseJoinColumns: [{ name: 'service_id' }]
    // })
    // services: Service[]
}