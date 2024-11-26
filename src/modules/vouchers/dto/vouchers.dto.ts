import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";


export class QueryVoucherDTO {
    @ApiProperty({ required: false })
    id?: number;

    @ApiProperty({ required: false})
    code: string;

    @ApiProperty({ required: false})
    description: string;

    @ApiProperty({ required: false})
    discount_type: string;

    @ApiProperty({ required: false})
    discount_value: number;

    @ApiProperty({ required: false})
    price_threshold: number;

    @ApiProperty({ required: false})
    required_point: number;

    @ApiProperty({ required: false })

    @ApiProperty({ required: false })
    start_date: Date;

    @ApiProperty({ required: false })
    end_date: Date;


    @ApiProperty({ required: false })
    branch_id: number;

    @ApiProperty({ required: false })
    updated_at?: Date;

    @ApiProperty({ required: false })
    created_at?: Date;

}



