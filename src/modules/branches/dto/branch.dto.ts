import {
     IsString, 
     IsNumber, 
     IsNotEmpty,
     IsBoolean} from 'class-validator';

export class CreateBranchDTO {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsBoolean()
    @IsNotEmpty()
    status: number;
}