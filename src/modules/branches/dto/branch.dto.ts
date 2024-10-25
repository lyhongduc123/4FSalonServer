import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
     IsString, 
     IsNotEmpty,
     IsBoolean} from 'class-validator';

export class CreateBranchDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

export class UpdateBranchDTO extends PartialType(CreateBranchDTO) {}