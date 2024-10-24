import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @IsString()
    title: string;

    @IsNumber()
    stylelist_id: number;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsDate()
    @IsNotEmpty()
    start_time: Date;

    @IsDate()
    estimated_end_time: Date;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}