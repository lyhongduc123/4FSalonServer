import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Employee } from './entity';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../branches/entity';

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

    async create(employee: CreateEmployeeDTO, branch: Branch): Promise<Employee> {
        const employeeExists = await this.employeesRepository.findOneBy({
            email: employee.email,
            phone: employee.phone,
            name: employee.name,
        });  
        if (employeeExists) {
            throw new Error('Employee already exists');
        }
        const newEmployee = this.employeesRepository.create({...employee, branch});
        return this.employeesRepository.save(newEmployee);
    }

    async update(employee: UpdateEmployeeDTO): Promise<Employee> {
        if (!employee.id) {
            throw new Error('Id is required');
        }
        const employeeExist = await this.employeesRepository.findOneBy({ id: employee.id });
        if (!employeeExist) {
            throw new Error('Employee not found');
        }
        const updatedEmployee = this.employeesRepository.create(employee);

        return this.employeesRepository.save(updatedEmployee);
    }

    async remove(id: number): Promise<any> {
        return this.employeesRepository.softDelete({ id });
    }

    async delete(id: number): Promise<any> {
        return this.employeesRepository.delete({ id });
    }
}
