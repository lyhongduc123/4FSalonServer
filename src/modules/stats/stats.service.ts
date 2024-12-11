import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Appointment } from '../appointments/entity';
import { Customer } from '../customers/entity';
import { User } from '../users/entity';

@Injectable()
export class StatsService {
    constructor(private dataSource: DataSource) {}

    async getStatByAppointment(query: any) {
        const startDate = query.start_date ? new Date(query.start_date) : new Date(2000, 0, 1);
        const endDate = query.end_date ? new Date(query.end_date) : new Date(new Date().setHours(23, 59, 59, 999));

        const stats = await this.dataSource
        .createQueryBuilder(Appointment, 'appointment')
        .select('COUNT(appointment.id)', 'number_of_appointments')
        .addSelect('SUM(appointment.final_price)', 'total_revenue')
        .addSelect('AVG(appointment.final_price)', 'average_revenue')
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

    async getStat(query: any) {
        let result: any = { appointment: null, customer: null, new_customer: null };
        result.appointment = await this.getStatByAppointment(query);
        if (query.customer) {
            result.customer = await this.getStatByCustomer(query);
        }
        if (query.new_customer) {
            result.new_customer = await this.getCustomerStat(query);
        }
        return result;
    }

    async getStatByCustomer(query: any) {
        const startDate = query.start_date ? new Date(query.start_date) : new Date(2000, 0, 1);
        const endDate = query.end_date ? new Date(query.end_date) : new Date(new Date().setHours(23, 59, 59, 999));

        const customer_served = await this.dataSource
        .createQueryBuilder(Appointment, 'appointment')
        .select('COUNT(DISTINCT appointment.user_id)', 'number_of_customers_served')
        .where(`appointment.date BETWEEN '${ startDate.toISOString() }' AND '${ endDate.toISOString() }'`)
        .andWhere("appointment.status = 'completed'")
        if (query.customer_branch_id) {
            customer_served.andWhere("appointment.branch_id = :branch_id", {branch_id: query.customer_branch_id})
        }
        const cacheTTL = Math.max(Math.abs(startDate.getTime() - endDate.getTime()), 86400000)
        customer_served.cache(query, cacheTTL)
        const customerStatistic = await customer_served.getRawOne();
        return customerStatistic;
    }

    async getCustomerStat(query: any) {
        const startDate = query.start_date ? new Date(query.start_date) : new Date(2000, 0, 1);
        const endDate = query.end_date ? new Date(query.end_date) : new Date(new Date().setHours(23, 59, 59, 999));

        const new_customer = await this.dataSource.createQueryBuilder(User, 'user')
        .select('COUNT(DISTINCT id)', 'number_of_customers_user')
        .where(`user.created_at BETWEEN '${ startDate.toISOString() }' AND '${ endDate.toISOString() }'`)
        .andWhere("user.role = 'customer'")
        
        if (query.new_customer_group_by) {
            switch(query.new_customer_group_by) {
                case 'day':
                    new_customer.addSelect("user.created_at", "created_at")
                    .groupBy("user.created_at")
                    break;
                case 'week':
                    new_customer.addSelect("user.created_at", "created_at")
                    .groupBy("user.created_at.MONTH")
                    break;
                case 'year':
                    new_customer.addSelect("user.created_at", "created_at")
                    .groupBy("user.created_at.YEAR")
                    break;
            }
        }

        const cacheTTL = Math.max(Math.abs(startDate.getTime() - endDate.getTime()), 86400000)
        new_customer.cache(query, cacheTTL)
        const newCustomerStatistic = await new_customer.getRawMany();
        return newCustomerStatistic;
    }
}