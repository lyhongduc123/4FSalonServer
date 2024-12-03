import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { AppointmentStatusDTO, CreateAppointmentDTO, QueryAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsOrder, In, Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AppointmentsService implements IEntity<Appointment, CreateAppointmentDTO, UpdateAppointmentDTO> {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>,
        private readonly mailService: MailService
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

    async findBy(where: any): Promise<Appointment[]> {
        let relation = ['customer', 'employee', 'service', 'branch'];
        if (where.have_feedback) {
            relation = [...relation, 'feedback'];
            delete where.have_feedback
        }
        const order = where.order;
        const skip = where.skip;
        const take = where.take;
        delete where.order;
        delete where.skip;
        delete where.take;

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
            where,
            relations: relation,
            order: order === 'asc' ? { id: "ASC" } : { id: "DESC" },
            skip: skip,
            take: take
        });
    }

    async findAvailable(employee_id: number, date: Date): Promise<any[]> {
        const modifiedDate = date.toISOString().split('T')[0];
        return this.appointmentsRepository.createQueryBuilder('appointment')
        .select(['appointment.start_time', 'appointment.estimated_end_time'])
        .where(`appointment.date BETWEEN '${ modifiedDate } 00:00:00' AND '${ modifiedDate } 23:59:59'`)
        .andWhere('appointment.employee_id = :employee_id', { employee_id })
        .getMany();
    }

    async create(appointment: CreateAppointmentDTO): Promise<Appointment> {
        appointment.status = 'pending';
        appointment.id = null;

        const appointmentExist = await this.appointmentsRepository.findOneBy({
            employee_id: Equal(appointment.employee_id),
            date: new Date(appointment.date),
            start_time: new Date(appointment.start_time),
            branch_id: Equal(appointment.branch_id),
            status: In(['pending', 'confirmed'])
        })

        if (appointmentExist) throw new ConflictException('Another appointment already exists at this time');
        const newAppointment = await this.appointmentsRepository.save(appointment);
        return newAppointment;
    }

    async update(appointment: UpdateAppointmentDTO): Promise<Appointment> {
        if (!appointment.id) throw new BadRequestException('Id not provided');

        let oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id: appointment.id });
        if (!oldAppointment) throw new NotFoundException('Appointment not found');

        oldAppointment = { ...oldAppointment, ...appointment };

        return this.appointmentsRepository.save(oldAppointment);
    }

    async updateSelf(user_id: number, appointment: UpdateAppointmentDTO): Promise<Appointment> {
        if (!appointment.id) throw new BadRequestException('Id not provided');

        let oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id: appointment.id });
        if (!oldAppointment) throw new NotFoundException('Appointment not found');
        if (oldAppointment.user_id !== user_id) throw new ForbiddenException('Forbidden request');

        oldAppointment = { ...oldAppointment, ...appointment};
        const updatedAppointment = await this.appointmentsRepository.save(oldAppointment);

        return updatedAppointment;
    }

    async patch(id: number, appointment: AppointmentStatusDTO): Promise<any> {
        if (!id) throw new BadRequestException('Id not provided');
        const oldAppointment: Appointment = await this.findOne(id);
        if (!oldAppointment) throw new NotFoundException('Appointment not found');

        appointment = { ...oldAppointment, ...appointment };
        const res = await this.appointmentsRepository.update(id, appointment)

        if (appointment.status === 'confirmed') {
            await this.mailService.sendConfirmedAppointmentMail(
                oldAppointment.customer.name,
                oldAppointment.customer.email,
                oldAppointment.date,
                oldAppointment.start_time,
                oldAppointment.service.title,
                oldAppointment.branch.address,
                oldAppointment.id
            );
        }
        if (appointment.status === 'cancelled') {
            await this.mailService.sendCancelledAppointmentMail(
                oldAppointment.customer.name,
                oldAppointment.customer.email,
                oldAppointment.date,
                oldAppointment.start_time,
                oldAppointment.service.title,
                oldAppointment.branch.address,
                oldAppointment.id
            );
        }
        return { message: `Appointment ${appointment.status} successfully` };
    }

    async remove(id: number): Promise<any> {
        return this.appointmentsRepository.delete({ id });
    }
}
