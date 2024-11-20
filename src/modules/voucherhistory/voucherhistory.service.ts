import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { VoucherHistory } from './entity';
import { QueryVoucherHistoryDTO,CreateVoucherHistoryDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { json } from 'stream/consumers';

@Injectable()
export class VoucherHistoryService{
    constructor(
        @InjectRepository(VoucherHistory)
        private voucherHistoryRepository: Repository<VoucherHistory>
    ) {}

    async findAll(): Promise<VoucherHistory[]> {
        return this.voucherHistoryRepository.find();
    }

    async findOne(id: number): Promise<VoucherHistory> {
        return this.voucherHistoryRepository.findOneBy({id})
    }

    async findBy(where: any): Promise<VoucherHistory[]> {
        return this.voucherHistoryRepository.find({
            select: {
                id: true,
                voucher_id: true,
                customer_id: true,
                created_at: true,
            },
            relations: [],
            where: where
        });
    }

    async create(data: CreateVoucherHistoryDTO): Promise<VoucherHistory> {
        const newVoucherHistory = await this.voucherHistoryRepository.save(data);
        return newVoucherHistory;
    }
}