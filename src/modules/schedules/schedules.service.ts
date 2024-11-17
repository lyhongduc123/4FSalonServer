import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SpecificOffDays, WorkingScheduleTemplate } from './entity';
import { SpecificOffDaysDTO, UpdateSpecificOffDaysDTO, UpdateWorkingScheduleTemplateDTO, WorkingScheduleTemplateDTO } from './dto';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(SpecificOffDays)
        private specificOffDaysRepository: Repository<SpecificOffDays>,

        @InjectRepository(WorkingScheduleTemplate)
        private workingScheduleTemplateRepository: Repository<WorkingScheduleTemplate>
    ) {}

    // Find
    async findAllSpecificOffDays(): Promise<SpecificOffDays[]> {
        return await this.specificOffDaysRepository.find();
    }

    async findAllWorkingScheduleTemplates(): Promise<WorkingScheduleTemplate[]> {
        return await this.workingScheduleTemplateRepository.find();
    }

    async findSpecificOffDays(where: SpecificOffDays): Promise<SpecificOffDays[]> {
        return await this.specificOffDaysRepository.find({ 
            select: ['id', 'employee_id', 'date'],
            relations: ['employee'],
            where: where 
        });
    }

    async findWorkingScheduleTemplate(where: WorkingScheduleTemplate): Promise<WorkingScheduleTemplate[]> {
        return await this.workingScheduleTemplateRepository.find({ 
            select: [
                'id', 
                'employee_id', 
                'monday', 
                'tuesday', 
                'wednesday',
                'thursday', 
                'friday', 
                'saturday', 
                'sunday'
            ],
            relations: ['employee'],
            where: where 
        });
    }


    // Create
    async createSpecificOffDays(data: SpecificOffDaysDTO): Promise<SpecificOffDays> {
        return await this.specificOffDaysRepository.save(data);
    }

    async createWorkingScheduleTemplate(data: WorkingScheduleTemplateDTO): Promise<WorkingScheduleTemplate> {
        return await this.workingScheduleTemplateRepository.save(data);
    }

    // Update
    async updateSpecificOffDays(data: UpdateSpecificOffDaysDTO): Promise<any> {
        return await this.specificOffDaysRepository.update(data.id, data);
    }

    async updateWorkingScheduleTemplate(data: UpdateWorkingScheduleTemplateDTO): Promise<any> {
        return await this.workingScheduleTemplateRepository.update(data.id, data);
    }

    // Delete
    async deleteSpecificOffDays(employee_id: number): Promise<any> {
        if (!employee_id) {
            throw new Error('Employee ID is required');
        }
        return await this.specificOffDaysRepository.softDelete({ employee_id });
    }

    async deleteWorkingScheduleTemplate(employee_id: number): Promise<any> {
        if (!employee_id) {
            throw new Error('Employee ID is required');
        }
        return await this.workingScheduleTemplateRepository.softDelete({ employee_id });
    }
}
