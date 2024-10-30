import { Delete } from "@nestjs/common";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Branch } from "../../branches/entity";
import { User } from "../../users/entity";
import { Appointment } from "src/modules/appointments/entity";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    phone: string;

    @Column()
    work_position: string;

    @Column()
    available_from: string;

    @Column()
    available_to: string;

    @Column()
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Branch, (branch) => branch.employees)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Appointment, (appointment) => appointment.employee)
    appointments: Appointment[]
}