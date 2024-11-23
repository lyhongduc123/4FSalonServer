import { BadRequestException, Injectable } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { AppointmentStatusDTO, CreateAppointmentDTO, QueryAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService implements IEntity<Appointment, CreateAppointmentDTO, UpdateAppointmentDTO> {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>
    ) {}

    async findAll(): Promise<Appointment[]> {
        return this.appointmentsRepository.find({
            select: {
                id: true,
                title: true,
                date: true,
                start_time: true,
                estimated_end_time: true,
                status: true,
                created_at: true,
                updated_at: true
            },
            relations: ['customer', 'employee', 'service', 'branch']
        });
    }

    async findOne(id: number): Promise<Appointment> {
        return this.appointmentsRepository.findOne({ 
            where: { id }, 
            relations: ['customer', 'employee', 'service', 'branch'] 
        });
    }

    async findBy(where: QueryAppointmentDTO): Promise<Appointment[]> {
        let relation = ['customer', 'employee', 'service', 'branch'];
        if (where.have_feedback) {
            relation = [...relation, 'feedback'];
            delete where.have_feedback
        }
        return this.appointmentsRepository.find({
            select: {
                id: true,
                title: true,
                date: true,
                start_time: true,
                estimated_end_time: true,
                status: true,
                created_at: true,
                updated_at: true,
            },
            relations: relation,
            where: where
        });
    }

    async findAvailable(employee_id: number, date: Date): Promise<any[]> {
        const modifiedDate = date.toISOString().split('T')[0];
        return this.appointmentsRepository.createQueryBuilder('appointment')
        .select(['appointment.date.start_time', 'appointment.date.estimated_end_time'])
        .where(`appointment.date BETWEEN '${ modifiedDate } 00:00:00' AND '${ modifiedDate } 23:59:59'`)
        .andWhere('appointment.employee_id = :employee_id', { employee_id })
        .getMany();
    }

    async create(appointment: CreateAppointmentDTO): Promise<Appointment> {
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
