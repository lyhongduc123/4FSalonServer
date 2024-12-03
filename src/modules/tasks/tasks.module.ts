import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MailModule } from '../mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailModule,
    AppointmentsModule
  ],
  providers: [TasksService]
})
export class TasksModule {}
