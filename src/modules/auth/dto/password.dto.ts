import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsEmail()
    email: string;

    @IsString()
    oldPassword: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string;
}

export class ForgotPasswordDto {
    @IsEmail()
    email: string;
}