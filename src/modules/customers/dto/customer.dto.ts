import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateCustomerDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    phone: string;
}