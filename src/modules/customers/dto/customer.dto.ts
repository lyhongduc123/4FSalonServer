import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCustomerDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'email@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '0912487918' })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ example: '1' })
    @IsNumber()
    @IsNotEmpty()
    user_id?: number;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}