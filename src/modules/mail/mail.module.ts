import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import mailerConfig from '../../config/mailer.config';

@Module({
    imports: [
        NestMailerModule.forRootAsync({
            useFactory: () => mailerConfig(),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
