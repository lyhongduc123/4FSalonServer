import { BadRequestException, Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { AppointmentStatusDTO, CreateAppointmentDTO, QueryAppointmentDTO, UpdateAppointmentDTO } from './dto';
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

    async findBy(where: QueryAppointmentDTO): Promise<Appointment[]> {
        let relation = ['customer', 'employee', 'service', 'branch'];
        if (where.have_feedback) {
            relation = [...relation, 'feedback'];
            delete where.have_feedback
        }
        return this.appointmentsRepository.find({
            relations: relation,
            where: where
        });
    }

    async create(appointment: CreateAppointmentDTO, customer: Customer, employee: Employee): Promise<Appointment> {
        const start_time = new Date(appointment.start_time);
        const estimated_end_time = new Date(appointment.estimated_end_time);
        const end_time = new Date(start_time.getTime() + estimated_end_time.getTime());
        appointment.estimated_end_time = end_time;

        const newAppointment = await this.appointmentsRepository.save(appointment);
        return newAppointment;
    }

    async update(appointment: UpdateAppointmentDTO): Promise<Appointment> {
        if (!appointment.id) throw new Error('Id not provided');

        let oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id: appointment.id });
        if (!oldAppointment) throw new Error('Appointment not found');

        oldAppointment = { ...oldAppointment, ...appointment };

        return this.appointmentsRepository.save(oldAppointment);
    }

    async patch(id: number, appointment: AppointmentStatusDTO): Promise<any> {
        if (!id) throw new Error('Id not provided');
        const oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id });
        if (!oldAppointment) throw new Error('Appointment not found');

        appointment = { ...oldAppointment, ...appointment };
        return this.appointmentsRepository.update(id, appointment);
    }

    async remove(id: number): Promise<any> {
        return this.appointmentsRepository.softDelete({ id });
    }
}
