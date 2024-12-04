import { Injectable } from '@nestjs/common';
import { MailService } from './modules/mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendMail() {
    await this.mailerService.sendMail({
      to: '22021217@vnu.edu.vn',
      subject: 'Test Mail',
      text: 'Test Mail',
    });
  }
}
