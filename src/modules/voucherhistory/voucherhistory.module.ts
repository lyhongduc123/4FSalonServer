import {Module} from '@nestjs/common';
import {VoucherHistoryService} from './voucherhistory.service';
import {VoucherHistoryController} from './voucherhistory.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VoucherHistory} from './entity';
import { CustomersModule } from '../customers/customers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VoucherHistory]),
    ],
    providers: [VoucherHistoryService],
    controllers: [VoucherHistoryController],
    exports: [VoucherHistoryService]
})
export class VoucherHistoryModule {}