import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    employee_id: number;

    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    start_time: Date;

    @ApiProperty()
    estimated_end_time: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty()
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