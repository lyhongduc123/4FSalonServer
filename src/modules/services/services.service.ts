import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Service } from './entity';
import { CreateServiceDTO, UpdateServiceDTO } from './dto';
import { IEntity } from 'src/interfaces';

@Injectable()
export class ServicesService implements IEntity<Service, CreateServiceDTO, UpdateServiceDTO> {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {}

    async findOne(id: number): Promise<Service> {
        return this.servicesRepository.findOneBy({ id });
    }

    async findBy(where: any): Promise<Service[]> {
        return this.servicesRepository.findBy(where);
    }

    async findAll() {
        return this.servicesRepository.find();
    }

    async create(service: CreateServiceDTO): Promise<Service> {
        return this.servicesRepository.save(service);
    }

    async update(service: UpdateServiceDTO): Promise<Service> {
        return this.servicesRepository.save(service);
    }

    async remove(id: number): Promise<any> {
        return this.servicesRepository.softDelete({ id });
    }
}
