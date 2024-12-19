import { AfterInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Branch } from "../../branches/entity";
import { Appointment } from "../../appointments/entity";
import { SpecificOffDays, WorkingScheduleTemplate } from "../../schedules/entity";

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

    @Column({
        default: true
    })
    status: boolean;

    @Column({ type: 'float', default: 0 })
    overall_rating: number;

    @Column({default: 0})
    number_of_ratings: number;

    @Column({
        nullable: true
    })
    big_avatar_url: string;

    @Column({
        nullable: true
    })
    small_avatar_url: string;

    @Column()
    branch_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Branch, (branch) => branch.employees)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @OneToMany(() => Appointment, (appointment) => appointment.employee)
    appointments: Appointment[]

    @OneToOne(() => SpecificOffDays, (specificOffDays) => specificOffDays.employee)
    specificOffDays: SpecificOffDays;

    @OneToOne(() => WorkingScheduleTemplate, (workingScheduleTemplate) => workingScheduleTemplate.employee)
    workingScheduleTemplate: WorkingScheduleTemplate;
}