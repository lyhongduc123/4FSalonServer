import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entity';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './dto';
import { Appointment } from '../appointments/entity';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbacksRepository: Repository<Feedback>,
    ) {}

    async findAll(): Promise<Feedback[]> {
        return this.feedbacksRepository.find({ 
            select: {
                id: true,
                branch_rating: true,
                branch_feedback: true,
                employee_rating: true,
                employee_feedback: true,
                overall_rating: true,
                created_at: true,
                updated_at: true,
                appointment: {
                    id: true,
                    date: true,
                    customer: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        points: true,
                        user_id: true,
                        booking_count: true,
                        cancel_count: true,
                    },
                    employee: {
                        id: true,
                        name: true,
                    },
                    branch: {
                        id: true,
                        name: true,
                    }
                },
            },
            relations: ['appointment', 'appointment.customer', 'appointment.employee', 'appointment.branch']
        });
    }

    async findOne(id: number): Promise<Feedback> {
        return this.feedbacksRepository.findOne({
            where: { id },
            select: {
                id: true,
                branch_rating: true,
                branch_feedback: true,
                employee_rating: true,
                employee_feedback: true,
                overall_rating: true,
                created_at: true,
                updated_at: true,
                appointment: {
                    id: true,
                    date: true,
                    customer: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        points: true,
                        user_id: true,
                        booking_count: true,
                        cancel_count: true,
                    },
                    employee: {
                        id: true,
                        name: true,
                    },
                    branch: {
                        id: true,
                        name: true,
                    }
                },
            },
            relations: ['appointment', 'appointment.customer', 'appointment.employee', 'appointment.branch']
        });
    }

    async findBy(where: any): Promise<Feedback[]> {
        return this.feedbacksRepository.find({ 
            where,
            select: {
                id: true,
                branch_rating: true,
                branch_feedback: true,
                employee_rating: true,
                employee_feedback: true,
                overall_rating: true,
                created_at: true,
                updated_at: true,
                appointment: {
                    id: true,
                    date: true,
                    customer: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        points: true,
                        user_id: true,
                        booking_count: true,
                        cancel_count: true,
                    },
                    employee: {
                        id: true,
                        name: true,
                    },
                    branch: {
                        id: true,
                        name: true,
                    }
                },
            },
            relations: ['appointment', 'appointment.customer', 'appointment.employee', 'appointment.branch']
        });
    }

    async create(createFeedbackDTO: CreateFeedbackDTO): Promise<Feedback> {
        const feedbackExists = await this.findBy({ appointment_id: createFeedbackDTO.appointment_id });
        if (feedbackExists.length > 0) {
            throw new ConflictException('Feedback already exists');
        }
        return this.feedbacksRepository.save(createFeedbackDTO);
    }

    async update(feedback: UpdateFeedbackDTO): Promise<Feedback> {
        let feedbackExists = await this.findOne(feedback.id);
        if (!feedbackExists) {
            throw new NotFoundException('Feedback not found');
        }
        feedbackExists = { ...feedbackExists, ...feedback };
        return this.feedbacksRepository.save(feedbackExists);
    }

    async delete(id: number): Promise<any> {
        return this.feedbacksRepository.softDelete(id);
    }
}
