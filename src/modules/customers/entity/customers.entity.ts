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

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    booking_count: number;

    @Column()
    cancel_count: number;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Appointment, (appointment) => appointment.customer)
    @JoinColumn({ name: 'appointment_id' })
    appointments: Appointment[];
}