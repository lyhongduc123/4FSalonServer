import { BadRequestException, Injectable } from '@nestjs/common';
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
        return await this.workingScheduleTemplateRepository.find({
            relations: {
                employee: {
                    branch: true
                }
            },
            select: {
                id: true,
                employee_id: true,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
                employee: {
                    id: true,
                    name: true,
                    email: true,
                    branch: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async findSpecificOffDays(where: any): Promise<SpecificOffDays[]> {
        const { date } = where;
        delete where.date;
        return await this.specificOffDaysRepository.find({ 
            select: ['id', 'employee_id', 'date'],
            relations: ['employee'],
            where: {
                date: new Date(date),
                ...where
            } 
        });
    }

    async findWorkingScheduleTemplateByBranch(branch_id: number): Promise<WorkingScheduleTemplate[]> {
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
            where: {
                employee: {
                    branch_id: branch_id
                }
            } 
        });
    }
    async findWorkingScheduleTemplateByEmployee(employee_id: number): Promise<WorkingScheduleTemplate[]> {
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
            where: {
                employee: {
                    id: employee_id
                }
            }
        });
    }

    async findSpecificOffDaysByBranch(branch_id: number): Promise<SpecificOffDays[]> {
        return await this.specificOffDaysRepository.find({ 
            relations: ['employee'],
            where: {
                employee: {
                    branch_id: branch_id
                }
            } 
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
        return await this.specificOffDaysRepository.save(data);
    }

    async updateWorkingScheduleTemplate(data: UpdateWorkingScheduleTemplateDTO): Promise<any> {
        return await this.workingScheduleTemplateRepository.save(data);
    }

    // Delete
    async deleteSpecificOffDays(id: number): Promise<any> {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
        return await this.specificOffDaysRepository.softDelete({ id });
    }

    async deleteWorkingScheduleTemplate(id: number): Promise<any> {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
        return await this.workingScheduleTemplateRepository.softDelete({ id });
    }

    async isWorking(employee_id: number, date: Date): Promise<any> {
        const day = date.getDay();
        const dayName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayValue = dayName[day];
        const workingDay = await this.workingScheduleTemplateRepository.findOne({ 
            where: {
                employee_id,
                [dayValue]: true
            }
        });
        return workingDay;
    }
}
