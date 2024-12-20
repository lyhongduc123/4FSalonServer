import { Appointment } from "src/modules/appointments/entity/appointments.entity";
import { Branch } from "src/modules/branches/entity";
import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    
    ManyToOne, 
    
    OneToMany, 
    
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 

} from "typeorm";


@Entity('vouchers', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Voucher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @Column({
        type: 'enum',
        enum: ['percentage', 'fixed'],
        default: 'percentage'
    })
    discount_type: string;

    @Column()
    discount_value: number;

    @Column()
    price_threshold: number;

    @Column()
    required_point: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;


    @Column()
    branch_id: number;

    @OneToMany(() => Appointment, (appointment) => appointment.voucher, { nullable: true })
    appointments: Appointment[];

    @ManyToMany(() => Branch, (branch) => branch.vouchers, {nullable: true})
    @JoinColumn({name: 'branch_id'})
    branches: Branch[];

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}