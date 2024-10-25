import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    google_id: string;

    @ApiProperty()
    @IsString()
    role?: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}