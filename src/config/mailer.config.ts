import { MailerOptions } from "@nestjs-modules/mailer";
import { registerAs } from "@nestjs/config";
import { config } from 'dotenv';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

config();

console.log(process.env.MAIL_HOST);
console.log(process.env.MAIL_PORT);
console.log(process.env.MAIL_USER);
console.log(process.env.MAIL_PASSWORD);
console.log(process.env.MAIL_SECURE);

export default registerAs('mailer', () => ({
    transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    },
    defaults: {
        from: '"No Reply" <noreply@example.com>',
    },
    template: {
        dir: __dirname + '/../common/templates',
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
}));