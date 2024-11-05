import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entity';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './dto';
import { Appointment } from '../appointments/entity';

@Injectable()
export class FeedbacksService {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbacksRepository: Repository<Feedback>,
    ) {}

    async findAll(): Promise<Feedback[]> {
        return this.feedbacksRepository.find({ 
            select: ['id', 'branch_rating', 'branch_feedback', 'employee_rating', 'employee_feedback', 'overall_rating', 'appointment_id', 'created_at', 'updated_at', 'appointment'],
            relations: ['appointment'] 
        });
    }

    async findOne(id: number): Promise<Feedback> {
        return this.feedbacksRepository.findOne({ where: { id } });
    }

    async findBy(where: any): Promise<Feedback[]> {
        return this.feedbacksRepository.find({ where: where });
    }

    async create(createFeedbackDTO: CreateFeedbackDTO): Promise<Feedback> {
        return this.feedbacksRepository.save(createFeedbackDTO);
    }

    async update(feedback: UpdateFeedbackDTO): Promise<Feedback> {
        let feedbackExists = await this.findOne(feedback.id);
        if (!feedbackExists) {
            throw new Error('Feedback not found');
        }
        feedbackExists = { ...feedbackExists, ...feedback };
        return this.feedbacksRepository.save(feedbackExists);
    }

    async delete(id: number): Promise<any> {
        return this.feedbacksRepository.delete(id);
    }
}
