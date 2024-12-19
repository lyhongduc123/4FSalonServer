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

    async incrementBookingCount(user_id: number): Promise<void> {
        const customer = await this.customersRepository.findOneBy({ user_id: user_id });
        this.customersRepository.update(customer.id, { booking_count: customer.booking_count + 1 });
    }

    async incrementPoints(user_id: number, points: number): Promise<void> {
        const customer = await this.customersRepository.findOneBy({ user_id: user_id });
        customer.points += points;
        this.customersRepository.update(customer.id, { points: customer.points });
    }

    async decrementPoints(user_id: number, points: number): Promise<void> {
        const customer = await this.customersRepository.findOneBy({ user_id: user_id });
        customer.points -= points;
        this.customersRepository.update(customer.id, { points: customer.points });
    }

    async incrementCancelCount(user_id: number): Promise<void> {
        const customer = await this.customersRepository.findOneBy({ user_id: user_id });
        customer.cancel_count += 1;
        this.customersRepository.update(customer.id, { cancel_count: customer.cancel_count });
    }

    async remove(id: number): Promise<any> {
        return this.customersRepository.softDelete(id);
    }

    async delete(id: number): Promise<any> {
        return this.customersRepository.delete(id);
    }
}
