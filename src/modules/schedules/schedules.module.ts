import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificOffDays, WorkingScheduleTemplate } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    WorkingScheduleTemplate,
    SpecificOffDays
  ])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
  exports: [SchedulesService]
})
export class SchedulesModule {}
