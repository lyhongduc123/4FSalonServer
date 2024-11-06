import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ChangePasswordDTO {
    @ApiProperty({ example: "email@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "oldpassword" })
    @IsString()
    oldPassword: string;

    @ApiProperty({ example: "newpassword", minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string;
}

export class ForgotPasswordDTO {
    @ApiProperty({ example: "recover@email.com" })
    @IsEmail()
    email: string;
}