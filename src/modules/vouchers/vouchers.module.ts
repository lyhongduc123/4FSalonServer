import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';

@Module({
  providers: [VouchersService],
  controllers: [VouchersController]
})
export class VouchersModule {}
