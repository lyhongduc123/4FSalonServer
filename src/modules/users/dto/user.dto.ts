import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDTO {
    @ApiProperty({ example: '1'})
    @IsNumber()
    @IsOptional()
    id?: number;
    
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
    @IsOptional()
    google_id?: string;

    @ApiProperty({ example: 'customer'})
    @IsString()
    @IsOptional()
    role?: string;

    @ApiProperty({ example: 'https://example'})
    @IsString()
    @IsOptional()
    picture_url?: string;
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