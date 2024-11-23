import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entity';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    BranchesModule
  ],
  providers: [VouchersService],
  controllers: [VouchersController],
  exports: [VouchersService]
})
export class VouchersModule {}
