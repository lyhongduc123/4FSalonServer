import { IsEmail, IsNotEmpty, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CustomerUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}