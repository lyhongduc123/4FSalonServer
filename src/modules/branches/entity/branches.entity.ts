import { User } from "./../../users/entity";
import { Employee } from "./../../employees/entity";
import { 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    UpdateDateColumn, 
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToMany,
    AfterInsert} from "typeorm";
import { Appointment } from "src/modules/appointments/entity";
import { Voucher } from "src/modules/vouchers/entity";


@Entity('branches', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        nullable: false
    })
    address: string;

    @Column({
        nullable: true
    })
    phone: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    status: boolean;
    
    @Column({
        nullable: true
    })
    picture_url: string;
    @Column({
        type: 'decimal',
        precision: 11,
        scale: 8,
        default: 1.23456789
    })
    long: number;
    @Column({
        type: 'decimal',
        precision: 11,
        scale: 8,
        default: 1.23456789
    })
    lat: number;
    @OneToMany(() => Employee, (employee) => employee.branch)
    employees: Employee[];

    @OneToMany(() => Appointment, (appointment) => appointment.branch)
    appointments: Appointment[];
   
    @ManyToMany(() => Voucher, (voucher) => voucher.branches)
    vouchers: Voucher[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}