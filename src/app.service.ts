import { Injectable } from '@nestjs/common';
import { MailService } from './modules/mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
