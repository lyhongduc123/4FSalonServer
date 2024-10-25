import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Employee } from './entity';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService implements IEntity<Employee, CreateEmployeeDTO, UpdateEmployeeDTO> {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
    ) {}

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();    
    }

    async findOne(id: number): Promise<Employee> {
        return this.employeesRepository.findOneBy({ id });
    }

    async findBy(where: any): Promise<Employee[]> {
        return this.employeesRepository.findBy(where);
    }

    async create(entity: CreateEmployeeDTO): Promise<Employee> {
        return this.employeesRepository.save(entity);
    }

    async update(entity: UpdateEmployeeDTO): Promise<Employee> {
        return this.employeesRepository.save(entity);
    }

    async remove(id: number): Promise<any> {
        return this.employeesRepository.softDelete({ id });
    }
}
