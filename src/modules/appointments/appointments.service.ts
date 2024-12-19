import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { IEntity } from 'src/interfaces';
import { Appointment } from './entity';
import { AppointmentStatusDTO, CreateAppointmentDTO, QueryAppointmentDTO, UpdateAppointmentDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsOrder, In, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class AppointmentsService implements IEntity<Appointment, CreateAppointmentDTO, UpdateAppointmentDTO> {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>,
        private readonly customersService: CustomersService,
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
                final_price: true,
                created_at: true,
                updated_at: true
            },
            withDeleted: true,
            relations: ['customer', 'employee', 'service', 'branch', 'voucher']
        });
    }

    async findOne(id: number): Promise<Appointment> {
        return this.appointmentsRepository.findOne({ 
            where: { id }, 
            relations: ['customer', 'employee', 'service', 'branch'] 
        });
    }

    async findBy(where: any): Promise<Appointment[]> {
        let relation = ['customer', 'employee', 'service', 'branch', 'voucher'];
        if (where.have_feedback) {
            relation = [...relation, 'feedback'];
            delete where.have_feedback
        }
        const { order, skip, take, date, start_time, estimated_end_time } = where;
        delete where.order;
        delete where.skip;
        delete where.take;
        delete where.date;
        delete where.start_time;
        delete where.estimated_end_time;
        
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
            where: {
                date: date ? new Date(date) : undefined,
                start_time: start_time ? MoreThanOrEqual(new Date(start_time)) : undefined,
                estimated_end_time: estimated_end_time ? new Date(estimated_end_time) : undefined,
                ...where
            },
            relations: relation,
            withDeleted: true,
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
        .andWhere('appointment.status = :status', { status: 'confirmed' })
        .andWhere('appointment.deleted_at IS NULL')
        .getMany();
    }

    async create(appointment: CreateAppointmentDTO): Promise<Appointment> {
        if (appointment.status !== 'confirmed') {
            appointment.status = 'pending';
        }
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
        await this.customersService.incrementBookingCount(newAppointment.user_id);
        return newAppointment;
    }

    async update(appointment: UpdateAppointmentDTO): Promise<Appointment> {
        if (!appointment.id) throw new BadRequestException('Id not provided');

        let oldAppointment: Appointment = await this.appointmentsRepository.findOneBy({ id: appointment.id });
        if (!oldAppointment) throw new NotFoundException('Appointment not found');

        oldAppointment = { ...oldAppointment, ...appointment };

        const res = await this.appointmentsRepository.save(oldAppointment);
        if (appointment.status === 'cancelled') {
            await this.customersService.incrementCancelCount(oldAppointment.user_id);
        }
        return res;
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

        switch (appointment.status) {
            case 'confirmed':
                await this.mailService.sendConfirmedAppointmentMail(
                    oldAppointment.customer.name,
                    oldAppointment.customer.email,
                    oldAppointment.date,
                    oldAppointment.start_time,
                    oldAppointment.service.title,
                    oldAppointment.branch.address,
                    oldAppointment.id
                );
                break;
            case 'cancelled':
                await this.mailService.sendCancelledAppointmentMail(
                    oldAppointment.customer.name,
                    oldAppointment.customer.email,
                    oldAppointment.date,
                    oldAppointment.start_time,
                    oldAppointment.service.title,
                    oldAppointment.branch.address,
                    oldAppointment.id
                );
                await this.customersService.incrementCancelCount(oldAppointment.user_id);
                break;
            case 'completed':
                await this.customersService.incrementPoints(oldAppointment.user_id, Math.floor(oldAppointment.final_price / 100 * 5));
                break;
            case 'pending':
                break;
            default:
                throw new BadRequestException('Invalid status');
                
        }
        return oldAppointment;
    }

    async remove(id: number): Promise<any> {
        return this.appointmentsRepository.delete({ id });
    }
}
