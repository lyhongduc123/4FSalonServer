import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Appointment } from "../entity";

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
    @ApiProperty()
    @IsOptional()
    where?: Appointment;

    @ApiProperty({ example: true })
    have_feedback?: boolean;
}