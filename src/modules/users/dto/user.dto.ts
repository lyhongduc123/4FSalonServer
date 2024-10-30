import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDTO {
    @ApiProperty({ example: 'example@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'null'})
    @IsString()
    google_id?: string;

    @ApiProperty({ example: 'customer'})
    @IsString()
    role?: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class CustomerUserDTO extends CreateUserDTO {
    @ApiProperty({ example: 'trieutulong'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '0987654321'})
    @IsString()
    @IsOptional()
    phone: string;
}