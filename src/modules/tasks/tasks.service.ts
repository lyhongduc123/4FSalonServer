import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppointmentsService } from '../appointments/appointments.service';
import { Between } from 'typeorm';
import { MailService } from '../mail/mail.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    private readonly appointmentService: AppointmentsService;
    private readonly mailService: MailService;

    @Cron(CronExpression.EVERY_DAY_AT_9PM, {
        name: 'notifications',
        utcOffset: 7
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
}
