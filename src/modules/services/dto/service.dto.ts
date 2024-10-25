import { PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsNotEmpty
} from 'class-validator'

export class CreateServiceDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    estimate_time: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class UpdateServiceDTO extends PartialType(CreateServiceDTO) {}