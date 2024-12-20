import {
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    Entity,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../../users/entity';
import { Appointment } from '../../appointments/entity';

export type CustomerGender = 'Male' | 'Female' | 'Secret';

@Entity('customers', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        nullable: true,
    })
    phone: string;

    @Column({
        type: 'enum',
        nullable: true,
        enum: ['Male', 'Female', 'Secret'],
    })
    gender: CustomerGender;

    @Column({
        default: 0,
    })
    booking_count: number;

    @Column({
        default: 0,
    })
    cancel_count: number;

    @Column({
        default: 0,
        type: 'int',
    })
    points: number;

    @Column()
    user_id: number;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Appointment, (appointment) => appointment.customer)
    appointments: Appointment[];
}