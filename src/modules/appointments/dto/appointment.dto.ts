import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    stylelist_id: number;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    start_time: Date;

    @ApiProperty()
    @IsDate()
    estimated_end_time: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}

export class UpdateAppointmentDTO extends CreateAppointmentDTO {}