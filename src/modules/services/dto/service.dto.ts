import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
} from 'class-validator'

export class CreateServiceDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'Cat toc' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Cat toc gia re voi cac stylist co trinh do chuyen nghiep' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 30 })
    @IsNumber()
    @IsNotEmpty()
    estimate_time: number;

    @ApiProperty({ example: 100000 })
    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class UpdateServiceDTO extends PartialType(CreateServiceDTO) {}