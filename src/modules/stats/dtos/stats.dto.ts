import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsNumberString, IsOptional } from "class-validator";
import { AppointmentStatus } from "src/modules/appointments/entity";

export class QueryStats {

    @ApiProperty({ required: false })
    @IsNumberString()
    @IsOptional()
    branch_id: number;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    start_date: Date;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    end_date: Date;

    @ApiProperty({ 
        required: false,
        enum: ['pending', 'confirmed', 'cancelled', 'completed']
    })
    status: AppointmentStatus

    @ApiProperty({ 
        required: false,
        enum: ['pending', 'confirmed', 'cancelled', 'completed']
    })
    not_status: AppointmentStatus

    @ApiProperty({ 
        required: false,
        enum: ['branch', 'day', 'month', 'year', 'service', 'employee'] 
    })
    group_by: string;
}