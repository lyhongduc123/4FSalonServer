import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 5 })
    @IsNumber()
    @IsNotEmpty()
    branch_rating: number;

    @ApiProperty({ example: 'Great service' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    branch_feedback: string;

    @ApiProperty({ example: 4 })
    @IsNumber()
    @IsNotEmpty()
    employee_rating: number;

    @ApiProperty({ example: 'Good communication' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    employee_feedback: string;

    @ApiProperty({ example: 4 })
    @IsNumber()
    @IsNotEmpty()
    overall_rating: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    appointment_id: number;
}

export class UpdateFeedbackDTO extends PartialType(CreateFeedbackDTO) {}