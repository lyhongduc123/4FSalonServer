import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { CreateAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService implements IEntity<Appointment, CreateAppointmentDTO, UpdateAppointmentDTO> {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>
    ) {}

    async findAll(): Promise<Appointment[]> {
        return this.appointmentsRepository.find();
    }

    async findOne(id: number): Promise<Appointment> {
        return this.appointmentsRepository.findOneBy({ id });
    }

    async findBy(where: any): Promise<Appointment[]> {
        return this.appointmentsRepository.findBy(where);
    }

    async create(appointment: CreateAppointmentDTO): Promise<Appointment> {
        
        return this.appointmentsRepository.save(appointment);
    }

    async update(appointment: UpdateAppointmentDTO): Promise<Appointment> {
        return this.appointmentsRepository.save(appointment);
    }

    async remove(id: number): Promise<any> {
        return this.appointmentsRepository.softDelete({ id });
    }
}
