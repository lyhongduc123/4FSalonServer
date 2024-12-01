import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
        const customerExists = await this.customersRepository.findOneBy({
            name: customer.name,
            email: customer.email,
        });
        if (customerExists) {
            throw new ConflictException('Customer already exists');
        }
        const newCustomer = this.customersRepository.create(customer);
        return this.customersRepository.save(newCustomer);
    }

    async update(customer: UpdateCustomerDTO): Promise<Customer> {
        if (!customer.id) {
            throw new BadRequestException('Id is required');
        }
        const customerExist = await this.customersRepository.findOneBy({ id: customer.id });
        if (!customerExist) {
            throw new NotFoundException('Customer not found');
        }
        return this.customersRepository.save(customer);
    }

    async remove(id: number): Promise<any> {
        return this.customersRepository.softDelete(id);
    }

    async delete(id: number): Promise<any> {
        return this.customersRepository.delete(id);
    }
}
