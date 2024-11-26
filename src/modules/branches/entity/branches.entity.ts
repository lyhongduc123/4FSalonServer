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
    ManyToMany} from "typeorm";
import { Appointment } from "src/modules/appointments/entity";
import { Voucher } from "src/modules/vouchers/entity";


@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: false
    })
    address: string;

    @Column()
    imageUrl: string;

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
    
    @Column()
    user_id: number;

    @Column()
    picture_url: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

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