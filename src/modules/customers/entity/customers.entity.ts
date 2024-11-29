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

@Entity('customers')
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
        default: 0,
    })
    booking_count: number;

    @Column({
        default: 0,
    })
    cancel_count: number;

    @Column({
        default: 0,
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