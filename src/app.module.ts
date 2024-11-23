import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common';

import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ServicesModule } from './modules/services/services.module';
import { BranchesModule } from './modules/branches/branches.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    CustomersModule,
    EmployeesModule,
    AppointmentsModule,
    BranchesModule,
    ServicesModule,
    FeedbacksModule,
    AuthModule,
    SchedulesModule,
    VouchersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
