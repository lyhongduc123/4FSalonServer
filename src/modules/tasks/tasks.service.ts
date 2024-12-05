import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppointmentsService } from '../appointments/appointments.service';
import { Between, In } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { start } from 'repl';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    private readonly appointmentService: AppointmentsService;
    private readonly mailService: MailService;

    @Cron(CronExpression.EVERY_DAY_AT_9PM, {
        name: 'notifications',
    }) 
    async sendReminderMail() {
        this.logger.debug('Sending reminder emails');
        const res = await this.appointmentService.findBy({
            status: 'confirmed',
            date: Between(new Date(), new Date(Date.now() + 24 * 60 * 60 * 1000))
        })
        for (const appointment of res) {
            await this.mailService.sendAppointmentReminderMail(
                appointment.customer.name,
                appointment.customer.email,
                appointment.date,
                appointment.start_time,
                appointment.branch.address,
                appointment.id
            )
        }
    }

    @Cron('0 */20 7-22 * * *', {
        name: 'cancel-appointment-overdue',
    })
    async cancelAppointmentOverdue() {
        const awaitingAppointments = await this.appointmentService.findBy({
            status: In(['pending', 'confirmed']),
            date: Between(new Date(Date.now() - 1260000), new Date(Date.now() - 60000)),
            start_time: Between(new Date(Date.now() - 1260000), new Date(Date.now() - 60000))
        });

        for (const appointment of awaitingAppointments) {
            appointment.status = 'cancelled';
            await this.appointmentService.patch(appointment.id, appointment);
        }
    }
}
