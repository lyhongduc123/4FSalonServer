import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Appointment, AppointmentStatus } from "../entity";
import { IQuery } from "src/interfaces/query.interface";
import { Column } from "typeorm";

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
    @IsNotEmpty()
    estimated_end_time: Date;

    @ApiProperty({ example: 'pending' })
    @IsString()
    @IsOptional()
    status: AppointmentStatus;

    @ApiProperty({ example: 99000 })
    @IsNumber()
    @IsNotEmpty()
    final_price: number;

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
    @ApiProperty({ enum: ['pending', 'completed', 'cancelled', 'confirmed'] })
    @IsString()
    @IsNotEmpty()
    status: AppointmentStatus;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    final_price: number;
}

export class QueryAppointmentDTO implements IQuery {
    @ApiProperty({ required: false })
    where?: Appointment;

    @ApiProperty({ required: false })
    order?: any;

    @ApiProperty({ required: false })
    skip?: number;

    @ApiProperty({ required: false })
    take?: number;

    @ApiProperty({ required: false })
    page?: number;

    @ApiProperty({ example: true })
    have_feedback?: boolean;
}