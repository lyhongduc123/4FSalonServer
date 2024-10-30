import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ChangePasswordDTO {
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

export class ForgotPasswordDTO {
    @ApiProperty()
    @IsEmail()
    email: string;
}