import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCustomerDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}