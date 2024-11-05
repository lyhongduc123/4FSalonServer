import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id?: number;

    @IsNumber()
    @IsNotEmpty()
    branch_rating: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    branch_feedback: string;

    @IsNumber()
    @IsNotEmpty()
    employee_rating: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    employee_feedback: string;

    @IsNumber()
    @IsNotEmpty()
    overall_rating: number;

    @IsNumber()
    @IsNotEmpty()
    appointment_id: number;
}

export class UpdateFeedbackDTO extends PartialType(CreateFeedbackDTO) {}