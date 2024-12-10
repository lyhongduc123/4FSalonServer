import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Appointment } from '../appointments/entity';
import { group } from 'console';

@Injectable()
export class StatsService {
    constructor(private dataSource: DataSource) {}

    async getStat(query: any) {
        const startDate = query.start_date ? new Date(query.start_date) : new Date(2000, 0, 1);
        const endDate = query.end_date ? new Date(query.end_date) : new Date(new Date().setHours(23, 59, 59, 999));

        const stats = await this.dataSource
        .createQueryBuilder(Appointment, 'appointment')
        .select('COUNT(appointment.id)', 'number_of_appointments')
        .addSelect('SUM(appointment.final_price)', 'total_revenue')
        .innerJoin("appointment.branch", "branch")
        .innerJoin("appointment.employee", "employee")
        .innerJoin("appointment.service", "service")

        if (query.branch_id) {
            stats.where("appointment.branch_id = :branch_id", {branch_id: query.branch_id})
        }

        if (query.status) {
            stats.andWhere("appointment.status = :status", {status: query.status})
        }   
        
        if (query.not_status) {
            stats.andWhere("appointment.status != :status", {status: query.not_status})
        }

        stats.andWhere(`appointment.date BETWEEN '${ startDate.toISOString() }' AND '${ endDate.toISOString() }'`)

        if (query.group_by) {
            switch(query.group_by) {
                case 'branch':
                    stats.addSelect("appointment.branch_id as branch_id")
                    .addSelect("branch.name")
                    .groupBy("appointment.branch")
                    break;
                case 'day':
                    stats.addSelect("appointment.date")
                    .groupBy("appointment.date")
                    break;
                case 'week':
                    stats.addSelect("appointment.date")
                    .groupBy("appointment.date.MONTH")
                    break;
                case 'year':
                    stats.addSelect("appointment.date")
                    .groupBy("appointment.date.YEAR")
                    break;
                case 'service':
                    stats.addSelect("service.id")
                    .addSelect("service.title")
                    .groupBy("service.id")
                    break;
                case 'employee':
                    stats.addSelect("employee.id")
                    .addSelect("employee.name")
                    .groupBy("employee.id")
                    break;
            }
        }
        const cacheTTL = Math.max(Math.abs(startDate.getTime() - endDate.getTime()), 86400000)
        stats.cache(query, cacheTTL)
        return stats.getRawMany();
    }
}