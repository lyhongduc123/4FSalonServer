import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
    @ApiProperty({ example: 'admin@mail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string;
}