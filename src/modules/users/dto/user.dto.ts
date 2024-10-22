import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    google_id: string;

    @IsString()
    role: string;
}

