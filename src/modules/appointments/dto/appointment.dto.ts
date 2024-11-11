import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'Combo 5xx' })
    @IsString()
    title: string;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ example: '2021-09-01T08:00:00.000Z' })
    @IsNotEmpty()
    start_time: Date;

    @ApiProperty({ example: '2021-09-01T09:00:00.000Z' })
    estimated_end_time: Date;

    @ApiProperty({ example: 'pending' })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @ApiProperty({ example: '1', description: 'Customer\'s user id' })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ example: '1' })
    @IsNumber()
    @IsNotEmpty()
    service_id: number;

    @ApiProperty({ example: '1'})
    @IsNumber()
    @IsNotEmpty()
    branch_id: number;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    feedback_id: number;
}

export class AppointmentStatusDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    final_price: number;
}

export class QueryAppointmentDTO {
    @ApiProperty({ example: 1 })
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'Appointment title' })
    title?: string;

    @ApiProperty({ example: 1 })
    employee_id?: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    date?: Date;

    @ApiProperty({ example: '2021-09-01T08:00:00.000Z' })
    start_time?: Date;

    @ApiProperty({ example: '2021-09-01T09:00:00.000Z' })
    estimated_end_time?: Date;

    @ApiProperty({ example: 'pending' })
    status?: string;

    @ApiProperty({ example: 1 })
    user_id?: number;

    @ApiProperty({ example: 1 })
    service_id?: number;

    @ApiProperty({ example: 1 })
    branch_id?: number;

    @ApiProperty({ example: 1 })
    feedback_id?: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    created_at?: Date;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    updated_at?: Date;

    @ApiProperty({ example: true })
    have_feedback?: boolean;
}

export class AppointmentDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'Appointment title' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    employee_id?: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    date?: Date;

    @ApiProperty({ example: '2021-09-01T08:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    start_time?: Date;

    @ApiProperty({ example: '2021-09-01T09:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    estimated_end_time?: Date;

    @ApiProperty({ example: 'pending' })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    user_id?: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    service_id?: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    branch_id?: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    feedback_id?: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    created_at?: Date;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    updated_at?: Date;
}