import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @ApiProperty({ example: 'Combo 5xx' })
    @IsString()
    title: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    employee_id: number;

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

    @ApiProperty({ example: '1' })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({ example: '1' })
    @IsNumber()
    service_id: number;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {}

export class AppointmentStatusDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;
}

export class AppointmentDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ example: 'Appointment title' })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    employee_id: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    date: Date;

    @ApiProperty({ example: '2021-09-01T08:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    start_time: Date;

    @ApiProperty({ example: '2021-09-01T09:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    estimated_end_time: Date;

    @ApiProperty({ example: 'pending' })
    @IsString()
    @IsOptional()
    status: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    customer_id: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    service_id: number;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    created_at: Date;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    updated_at: Date;
}