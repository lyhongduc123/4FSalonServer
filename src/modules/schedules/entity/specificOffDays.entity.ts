import { Delete } from "@nestjs/common";
import { Employee } from "src/modules/employees/entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('specific_off_days')
export class SpecificOffDays {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employee_id: number;

    @Column()
    date: Date;

    @Column()
    reason: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => Employee, employee => employee.specificOffDays)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}