import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class ChangePasswordDTO {
    @ApiProperty({ example: "oldpassword" })
    @IsString()
    @IsOptional()
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