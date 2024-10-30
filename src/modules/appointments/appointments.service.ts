import { BadRequestException, Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { AppointmentStatusDTO, CreateAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entity';
import { Employee } from '../employees/entity';

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

    async create(appointment: CreateAppointmentDTO, customer: Customer, employee: Employee): Promise<Appointment> {
        const start_time = new Date(appointment.start_time);
        const estimated_end_time = new Date(appointment.estimated_end_time);
        const end_time = new Date(start_time.getTime() + estimated_end_time.getTime());
        appointment.estimated_end_time = end_time;

        const newAppointment = await this.appointmentsRepository.save(appointment);
        customer.appointments.push(newAppointment);
        employee.appointments.push(newAppointment);

        return newAppointment;
    }

    async update(id: number, appointment: UpdateAppointmentDTO): Promise<Appointment> {
        if (!id) throw new Error('Id not provided');

        let oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id });
        if (!oldAppointment) throw new Error('Appointment not found');

        oldAppointment = { ...oldAppointment, ...appointment };

        return this.appointmentsRepository.save(oldAppointment);
    }

    async patch(id: number, appointment: AppointmentStatusDTO): Promise<any> {
        if (!id) throw new Error('Id not provided');
        return this.appointmentsRepository.update(id, appointment);
    }

    async remove(id: number): Promise<any> {
        return this.appointmentsRepository.softDelete({ id });
    }
}
