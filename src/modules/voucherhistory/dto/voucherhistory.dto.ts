import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class QueryVoucherHistoryDTO {

    @ApiProperty({required:false, example: 1})
    id?: number;

    @ApiProperty({required:false, example: 1})
    customer_id?: number;

    @ApiProperty({required:false, example: 1})
    voucher_id?: number;
    
    @ApiProperty({required:false, example: 1})
    updated_at?: Date;

    @ApiProperty({required:false, example: 1})
    created_at?: Date;
}

export class CreateVoucherHistoryDTO {

    @ApiProperty({example: 1})
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 1})
    @IsNumber()
    customer_id: number;

    @ApiProperty({ example: 1})
    @IsNumber()
    voucher_id: number;
    
}

