import { Exclude } from 'class-transformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Customer } from '../../customers/entity';
import { Branch } from '../../branches/entity';
import { Appointment } from 'src/modules/appointments/entity';

export type UserRole = 'customer' | 'manager' | 'admin';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
    })
    @Exclude()
    password: string;

    @Column({
        nullable: true,
    })
    google_id: string;

    @Column({
        nullable: false,
        enum: [('customer, manager, admin')],
        default: 'customer'
    })
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({
        nullable: true,
    })
    picture_url: string;

    @OneToOne(() => Customer, (customer) => customer.user)
    customer: Customer;

    @OneToOne(() => Branch, (branch) => branch.user)
    branch: Branch;
}