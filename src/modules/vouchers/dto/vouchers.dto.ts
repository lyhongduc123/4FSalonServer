import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";


export class QueryVoucherDTO {
    @ApiProperty({ required: false, example: 1 })
    id?: number;

    @ApiProperty({ required: false, example: 'DISC10' })
    code: string;

    @ApiProperty({ required: false, example: '10% off on all services' })
    description: string;

    @ApiProperty({ required: false, example: 'percentage' })
    discount_type: string;

    @ApiProperty({ required: false, example: 10 })
    discount_value: number;

    @ApiProperty({ required: false, example: 100 })
    price_threshold: number;

    @ApiProperty({ required: false, example: 50 })
    required_point: number;

    @ApiProperty({ required: false, example: '2024-11-01T00:00:00.000Z' })
    start_date: Date;

    @ApiProperty({ required: false, example: '2024-12-31T00:00:00.000Z' })
    end_date: Date;


    @ApiProperty({ required: false, example: 1 })
    branch_id: number;

    @ApiProperty({ required: false })
    updated_at?: Date;

    @ApiProperty({ required: false })
    created_at?: Date;

}



