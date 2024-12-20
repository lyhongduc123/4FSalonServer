import { Delete } from "@nestjs/common";
import { Employee } from "src/modules/employees/entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('working_schedule_templates', { engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class WorkingScheduleTemplate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employee_id: number;

    @Column()
    monday: boolean;

    @Column()
    tuesday: boolean;

    @Column()
    wednesday: boolean;

    @Column()
    thursday: boolean;

    @Column()
    friday: boolean;

    @Column()
    saturday: boolean;

    @Column()
    sunday: boolean;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
    
    @OneToOne(() => Employee, employee => employee.workingScheduleTemplate)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}