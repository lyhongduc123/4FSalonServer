import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
    constructor(private mailer: NestMailerService) {}

    async sendAppointmentReminderMail(
        name: string, 
        email: string, 
        a_date: Date, 
        a_time: Date, 
        a_address: string, 
        a_id: number
    ): Promise<void> {
        const date = a_date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = a_time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const address = a_address;
        const url = process.env.FRONTEND_URL + "/appointment?" + a_id;
        await this.mailer.sendMail({
            to: email,
            subject: 'Nhắc lịch hẹn với 4FSalon',
            template: 'appointment-reminder',
            context: {
                name, 
                date, 
                time, 
                address,
                url
            },
        });
    }

    async sendResetPasswordMail(name: string, email: string, url_params: string): Promise<void> {
        const url = process.env.FRONTEND_URL + "/reset-password?" + url_params;
        await this.mailer.sendMail({
            to: email,
            subject: 'Khôi phục mật khẩu tài khoản 4FSalon',
            template: 'reset-password',
            context: {
                name,
                url
            }
        });
    }

    async sendConfirmedAppointmentMail(
        name: string, 
        email: string, 
        a_date: Date, 
        a_time: Date, 
        a_address: string, 
        a_service: string,
        a_id: number
    ): Promise<void> {
        const date = a_date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = a_time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const address = a_address;
        const service = a_service;
        const url = process.env.FRONTEND_URL + "/appointment?id=" + a_id;
        await this.mailer.sendMail({
            to: email,
            subject: 'Xác nhận lịch hẹn với 4FSalon',
            template: 'confirmed-appointment',
            context: {
                name, 
                date, 
                time, 
                service,
                address,
                url
            }
        });
    }

    async sendCancelledAppointmentMail(
        name: string, 
        email: string, 
        a_date: Date, 
        a_time: Date, 
        a_service: string,
        a_address: string, 
        a_id: number
    ): Promise<void> {
        const date = a_date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = a_time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const address = a_address;
        const service = a_service;
        const url = process.env.FRONTEND_URL + "/appointment?id=" + a_id;
        await this.mailer.sendMail({
            to: email,
            subject: 'Hủy lịch hẹn với 4FSalon',
            template: 'cancelled-appointment',
            context: {
                name, 
                date, 
                time, 
                service,
                address,
                url
            }
        });
    }
}
