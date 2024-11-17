import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Voucher } from './entity';
import { QueryVoucherDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { json } from 'stream/consumers';

@Injectable()
export class VouchersService {
    constructor(
        @InjectRepository(Voucher)
        private vouchersRepository: Repository<Voucher>
    ) {}

    async findAll(): Promise<Voucher[]> {
        return this.vouchersRepository.find();
    }

    async findOne(id: number): Promise<Voucher> {
        return this.vouchersRepository.findOneBy({id})
    }

    async findBy(where: any): Promise<Voucher[]> {
        return this.vouchersRepository.find({
            select: {
                id: true,
                code: true,
                description: true,
                discount_type: true,
                discount_value: true,
                price_threshold: true,
                required_point: true,
                start_date: true,
                end_date: true,
                branch_id: true,
                created_at: true,
            },
            relations: [],
            where: where
        });
    }

}
