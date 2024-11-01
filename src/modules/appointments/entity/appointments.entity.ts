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
import { Branch } from "src/modules/branches/entity";

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
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    })
    status: string;

    @Column()
    customer_id: number;

    @Column()
    employee_id: number;

    @Column()
    branch_id: number;

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

    @ManyToOne(() => Branch, (branch) => branch.appointments, { nullable: false })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;
    
    // @ManyToMany(() => Service, (service) => service.appointments)
    // @JoinTable({
    //     name: 'appointment_services',
    //     joinColumns: [{ name: 'appointment_id' }],
    //     inverseJoinColumns: [{ name: 'service_id' }]
    // })
    // services: Service[]
}