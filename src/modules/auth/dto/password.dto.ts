import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    oldPassword: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string;
}

export class ForgotPasswordDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}