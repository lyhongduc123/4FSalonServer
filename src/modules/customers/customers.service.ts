import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntity } from 'src/interfaces';
import { Customer } from './entity';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dto/customer.dto';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../users/dto';
import { User } from '../users/entity';

@Injectable()
export class CustomersService implements IEntity<Customer, CreateCustomerDTO, UpdateCustomerDTO>{
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>
    ) {}

    async findAll(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    async findOne(id: number): Promise<Customer> {
        return this.customersRepository.findOneBy({ id });
    }

    async findBy(where: any): Promise<Customer[]> {
        return this.customersRepository.findBy(where);
    }

    async create(customer: CreateCustomerDTO): Promise<Customer> {
        if (!customer.email) {
            throw new Error('Email is required');
        }
        if (!customer.name) {
            throw new Error('Name is required');
        }
        return this.customersRepository.save(customer);
    }

    async update(customer: UpdateCustomerDTO): Promise<Customer> {
        return this.customersRepository.save(customer);
    }

    async remove(id: number): Promise<any> {
        return this.customersRepository.softDelete(id);
    }

    async delete(id: number): Promise<any> {
        return this.customersRepository.delete(id);
    }
}
