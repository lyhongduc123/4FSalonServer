import { Customer } from "src/modules/customers/entity";
import { Employee } from "src/modules/employees/entity/employees.entity";
import { Service } from "src/modules/services/entity";
import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    ManyToMany, 
    JoinTable, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
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
    estimate_end_time: Date;

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

    @ManyToOne(() => Employee, (employee) => employee, { nullable: false })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToMany(() => Service, (service) => service.appointments)
    @JoinTable({
        name: 'appointment_services',
        joinColumns: [{ name: 'appointment_id' }],
        inverseJoinColumns: [{ name: 'service_id' }]
    })
    services: Service[]
}